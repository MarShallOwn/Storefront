// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export default class OrderStore {
  async index(): Promise<unknown | undefined> {
    try {
      const conn = await client?.connect();
      const sql = "SELECT order_products.id, orders.status, orders.user_id, order_products.quantity, orders.id AS order_id , order_products.product_id FROM orders FULL OUTER JOIN order_products ON orders.id = order_products.order_id";

      const result = await conn?.query(sql);

      conn?.release();

      return result?.rows;
    } catch (err) {
      throw new Error(`Couldn't get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [id]);

      conn?.release();

      return result?.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find order. Error: ${err}`);
    }
  }

  async create(isCompleted : boolean, userId: number): Promise<Order> {
    try {
      const conn = await client?.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1,$2) RETURNING *";

      const result = await conn?.query(sql, [isCompleted ? "completed" : "active", userId]);

      const orderResult = result?.rows[0];

      conn?.release();

      return orderResult;
    } catch (err) {
      throw new Error(`Couldn't create order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";

      const conn = await client?.connect();
      const result = await conn?.query(sql, [id]);

      conn?.release();

      return result?.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const sql =
        "insert into order_products(quantity, order_id, product_id) values($1, $2, $3) RETURNING *";

      const conn = await client?.connect();

      const result = await conn?.query(sql, [quantity, orderId, productId]);

      const order = await result?.rows[0];

      conn?.release();

      return order;
    } catch (err) {
      throw new Error(
        `Couldn't add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async getAllOrdersforUser(userId: number): Promise<Order[] | undefined> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = ($1)";

      const conn = await client?.connect();

      const result = await conn?.query(sql, [userId]);

      conn?.release();

      return result?.rows;
    } catch (err) {
      throw new Error(`Couldn't find user with userId of ${userId}: ${err}`);
    }
  }


  async getAllActiveOrdersforUser(userId: number): Promise<Order[] | undefined> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = ($1)";

      const conn = await client?.connect();

      const result = await conn?.query(sql, [userId]);

      conn?.release();

      return result?.rows;
    } catch (err) {
      throw new Error(`Couldn't find user with userId of ${userId}: ${err}`);
    }
  }


  async getAllOrdersforUserByStatus(userId: number, isCompleted: boolean): Promise<Order[] | undefined> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status= ($2)";

      const conn = await client?.connect();

      const result = await conn?.query(sql, [userId, isCompleted ? "completed" : "active"]);

      conn?.release();

      return result?.rows;
    } catch (err) {
      throw new Error(`Couldn't find user with userId of ${userId}: ${err}`);
    }
  }
}
