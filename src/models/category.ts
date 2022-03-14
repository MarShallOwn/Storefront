// @ts-ignore
import client from "../database";

export type Category = {
  id?: number;
  name: string;
};

export default class CategoryStore {
  async index(): Promise<Category[] | undefined> {
    try {
      const conn = await client?.connect();
      const sql = "SELECT * FROM categories";

      const result = await conn?.query(sql);

      conn?.release();
      return result?.rows;
    } catch (err) {
      throw new Error(`Couldn't get categories. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Category> {
    try {
      const sql = "SELECT * FROM categories WHERE id=($1)";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [id]);

      conn?.release();

      return result?.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find category. Error: ${err}`);
    }
  }

  async create(category: Category): Promise<Category> {
    try {
      const conn = await client?.connect();
      const sql =
        "INSERT INTO categories (name) VALUES($1) RETURNING *";

      const result = await conn?.query(sql, [category.name]);

      const categoryResult = result?.rows[0];

      conn?.release();

      return categoryResult;
    } catch (err) {
      throw new Error(`Couldn't create category. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const sql = "DELETE FROM categories WHERE id=($1) RETURNING *";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [id]);

      conn?.release();

      return result?.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete category. Error: ${err}`);
    }
  }
}
