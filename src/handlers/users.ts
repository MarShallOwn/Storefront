import { Request, Response, Application } from "express";
import UserStore, { User } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new UserStore();

// get the list of all users
const index = async (_req: Request, res: Response) => {
  const users: User[] | undefined = await store.index();
  return res.status(200).json({ users });
};

// create user handler and generate jwt token and return that token
const create = async (req: Request, res: Response) => {

  if(!req.body.hasOwnProperty("user")) {
    return res.status(400).json({err: "user object missing"})
  }

  const { password, confirmPassword, username, firstname, lastname, email } = req.body.user;

  if(!password || !confirmPassword || !username || !firstname || !lastname || !email) {
    return res.status(400).json({err: "missing user fields"})
  }


  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "password not equal confirm password" });
  }

  try {
    const user: User = await store.create(req.body.user);
    let token = jwt.sign({ user }, process.env.TOKEN_SECRET as Secret);

    return res.status(201).json(token);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

// get specific user by username search
const show = async (req: Request, res: Response) => {
  const username: string = req.params.username;

  try {
    const user = await store.show(username);
    res.json(user);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// authenticate user by loggin in using username, password and this will return user
const authenticate = async (req: Request, res: Response) => {

  if(!req.body.hasOwnProperty("user")) {
    return res.status(400).json({err: "user object missing"})
  }

  const { username, password } = req.body.user;

  if(!password || !username) {
    return res.status(400).json({err: "missing user fields"})
  }

  try {
    const token: string | null = await store.authenticate(username, password);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const user_routers = (app: Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:username", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
};

export default user_routers;
