import supertest from "supertest";
import { Order } from "../../models/order";
import app from "../../server";
import { restartTable } from "../../utils/restartTable";
import { authToken } from "../../store/authToken";

const request = supertest(app);

describe("Test orders endpoint", () => {
  describe("Test /orders of METHOD POST", () => {
    beforeAll(async () => {
      const category = {
        name: "clothes",
      };

      await request
        .post("/categories")
        .send({ category })
        .set("Authorization", `bearer ${authToken}`);
    });

    it("should add order and should return status of value return 201", async () => {
      const order = {
        isCompleted: true,
        userId: 1,
      };

      const result = await request
        .post("/orders")
        .send({ order })
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(201);
    });

    it("should return status of 400 if inputs are missing when creating order", async () => {
      const order = {};

      const result = await request
        .post("/orders")
        .send({ order })
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(400);
    });
  });

  describe("Test /orders of METHOD GET", () => {
    it("should return list of orders and should return status of value return 200", async () => {
      const result = await request
        .get("/orders")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });

  describe("Test /orders/:id of METHOD GET", () => {
    it("should return sepecific order and should return status of value return 200", async () => {
      const result = await request
        .get("/orders/1")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });

  describe("Test /orders/:id/products of METHOD POST", () => {
    it("should add product to the order and should return status of value return 200", async () => {
      const product = {
        name: "jacket",
        price: 550,
        categoryId: 2,
      };

      await request
        .post("/products")
        .send({ product })
        .set("Authorization", `bearer ${authToken}`);

      const productOrder = {
        productId: 1,
        quantity: 200,
      };

      const result = await request
        .post("/orders/1/products")
        .send({ product: productOrder })
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });

    it("should return status of 400 if inputs are missing when adding product to order", async () => {
      const productOrder = {};

      const result = await request
        .post("/orders/1/products")
        .send({ productOrder })
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(400);
    });
  });

  describe("Test /orders/user/:id of METHOD GET", () => {
    it("should return all orders of specific user and should return status of value return 200", async () => {
      const result = await request
        .get("/orders/1")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });

  describe("Test /orders-by-status/:isCompleted/user/:id of METHOD GET", () => {
    it("should return all orders of specific user depending on status and should return status of value return 200", async () => {
      const result = await request
        .get("/orders-by-status/true/user/1")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });

  describe("Test /orders/:id of METHOD DELETE", () => {
    it("should delete order and should return status of value return 200", async () => {
      const result = await request
        .delete("/orders/1")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });


  // for deleting all the rows in the table and restarting the auto_increment id to 1
  afterAll(async () => {
    await restartTable("users");
    await restartTable("categories");
    await restartTable("products");
    await restartTable("orders");
    await restartTable("order_products");
  });
});
