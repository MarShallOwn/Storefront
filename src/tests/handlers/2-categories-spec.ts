import supertest from "supertest";
import { Category } from "../../models/category";
import app from "../../server";
import { restartTable } from "../../utils/restartTable";

const request = supertest(app);

describe("Test categories endpoint", () => {
  describe("Test /categories of METHOD POST", () => {
    it("should add category and should return status of value return 201", async () => {
      const category: Category = {
        name: "clothes",
      };

      const result = await request.post("/categories").send({ category });

      expect(result.status).toBe(201);
    });

    it("should return status of 400 if inputs are missing when creating category", async () => {
      const category = {};

      const result = await request.post("/categories").send({ category });

      expect(result.status).toBe(400);
    });
  });

  describe("Test /categories of METHOD GET", () => {
    it("should return list of categories and should return status of value return 200", async () => {

      const result = await request.get("/categories")

      expect(result.status).toBe(200);
    });
  });

  describe("Test /categories/:id of METHOD GET", () => {
    it("should return sepecific category and should return status of value return 200", async () => {

      const result = await request.get("/categories/1")

      expect(result.status).toBe(200);
    });
  });

  describe("Test /categories/:id of METHOD DELETE", () => {
    it("should delete category and should return status of value return 200", async () => {

      const result = await request.delete("/categories/1")

      expect(result.status).toBe(200);
    });
  });
});
