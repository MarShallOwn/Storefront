// @ts-ignore
import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  categoryId: number;
};

export default class ProductStore {
  async index(): Promise<Product[] | undefined> {
    try {
      const conn = await client?.connect();
      const sql = "SELECT * FROM products";

      const result = await conn?.query(sql);

      conn?.release();
      return result?.rows;
    } catch (err) {
      throw new Error(`Couldn't get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [id]);

      conn?.release();

      return result?.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find product. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client?.connect();
      const sql =
        "INSERT INTO products (name, price, category_id) VALUES($1,$2, $3) RETURNING *";

      const result = await conn?.query(sql, [product.name, product.price, product.categoryId]);

      const productResult = result?.rows[0];

      conn?.release();

      return productResult;
    } catch (err) {
      throw new Error(`Couldn't create product. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [id]);

      conn?.release();

      return result?.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete product. Error: ${err}`);
    }
  }

  async getProductsByCategory(categoryName: string) : Promise<Product[] | undefined> {
    try {
    const sql = "SELECT * FROM products WHERE products.category_id = (select id FROM categories WHERE categories.name = ($1))";

    const conn = await client?.connect();

    const result = await conn?.query(sql, [categoryName]);

    conn?.release();

    return result?.rows;
    }catch (err) {
      throw new Error(`Couldn't get top 5 products. Error: ${err}`);
    }
  }


  async getTop5PopularProducts() : Promise<unknown> {
    try {
    const sql = "SELECT name, COUNT(product_id) FROM order_products RIGHT JOIN products ON order_products.product_id = products.id GROUP BY products.name ORDER BY COUNT(PRODUCT_id) DESC,name ASC LIMIT 5";

    const conn = await client?.connect();

    const result = await conn?.query(sql);

    conn?.release();

    return result?.rows;
    }catch (err) {
      throw new Error(`Couldn't get top 5 products. Error: ${err}`);
    }
  }
}
