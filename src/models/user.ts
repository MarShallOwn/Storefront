import client from "../database";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default class UserStore {
  async index(): Promise<User[] | undefined> {
    try {
      const sql = "SELECT * FROM USERS";

      const conn = await client?.connect();
      const result = await conn?.query(sql);

      const usersData = await result?.rows;

      conn?.release();

      return usersData;
    } catch (err) {
      throw new Error(`Couldn't find users. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (username, firstname, lastname, email, password) VALUES ($1,$2,$3,$4, $5) RETURNING *";

      const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as unknown as string)
      );

      const conn = await client?.connect();
      const result = await conn?.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        user.email,
        hash,
      ]);

      const userData = await result?.rows[0];

      conn?.release();

      return userData;
    } catch (err) {
      throw new Error(`unable to create user ${user.username}`);
    }
  }

  async show(username: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE username=($1)";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [username]);

      const userData: User = await result?.rows[0];

      conn?.release();

      return userData;
    } catch (err) {
      throw new Error(`unable to get user with username: ${username}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<string | null> {
    const user = await this.show(username);

    if (!bcrypt.compareSync(password, user.password)) {
      const token: string = jwt.sign(
        { user },
        process.env.TOKEN_SECRET as Secret
      );

      return token;
    }

    return null;
  }
}
