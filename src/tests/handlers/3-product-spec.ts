import supertest from "supertest";
import { Product } from "../../models/product";
import app from "../../server";
import { restartTable } from "../../utils/restartTable";
import { authToken } from "../../store/authToken";

const request = supertest(app);

describe("Test products endpoint", () => {
  describe("Test /products of METHOD POST", () => {
    beforeAll(async () => {
      const category = {
        name: "clothes",
      };

      await request.post("/categories").send({ category });
    });

    it("should add product and should return status of value return 201", async () => {
      const product: Product = {
        name: "t-shirt",
        price: 500,
        categoryId: 2,
      };

      const result = await request
        .post("/products")
        .send({ product })
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(201);
    });

    it("should return status of 400 if inputs are missing when creating product", async () => {
      const product = {};

      const result = await request
        .post("/products")
        .send({ product })
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(400);
    });
  });

  describe("Test /products of METHOD GET", () => {
    it("should return list of products and should return status of value return 200", async () => {
      const result = await request.get("/products");

      expect(result.status).toBe(200);
    });
  });

  describe("Test /products/:id of METHOD GET", () => {
    it("should return sepecific product and should return status of value return 200", async () => {
      const result = await request.get("/products/1");

      expect(result.status).toBe(200);
    });
  });

  describe("Test /products/category/:categoryName of METHOD GET", () => {
    it("should get product by categoryName and should return status of value return 200", async () => {
      const result = await request.get("/products/category/clothes");

      expect(result.status).toBe(200);
    });
  });

  describe("Test /products/top-5 of METHOD GET", () => {
    it("should get the top 5 products that are being ordered and should return status of value return 200", async () => {
      const result = await request.get("/products/top-5");

      expect(result.status).toBe(200);
    });
  });

  describe("Test /products/:id of METHOD DELETE", () => {
    it("should delete product and should return status of value return 200", async () => {
      const result = await request.delete("/products/1");

      expect(result.status).toBe(200);
    });
  });

    // for deleting all the rows in the table and restarting the auto_increment id to 1
    afterAll(async () => {
        await restartTable("products");
      });
});
