import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";
import { authToken, setAuthToken } from "../../store/authToken";
import { restartTable } from "../../utils/restartTable";

const request = supertest(app);

describe("Test users endpoint", () => {
  describe("Test /users of METHOD POST", () => {
    it("should add user and should return status of value return 201", async () => {
      const user = {
        username: "MarShallOwn",
        firstname: "marwan",
        lastname: "samih",
        email: "marwansamih15@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      };

      const result = await request.post("/users").send({ user });

      expect(result.status).toBe(201);
    });

    it("should return status of 400 if password doesnt equal confirmPassword when creating user", async () => {
      const user = {
        username: "MarShallOwn1",
        firstname: "marwan1",
        lastname: "samih1",
        email: "marwansamih16@gmail.com",
        password: "123",
        confirmPassword: "12345",
      };

      const result = await request.post("/users").send({ user });

      expect(result.status).toBe(400);
    });

    it("should return status of 400 if inputs are missing when creating user", async () => {
      const user = {};

      const result = await request.post("/users").send({ user });

      expect(result.status).toBe(400);
    });
  });

  describe("Test /users/authenticate of METHOD POST", () => {
    it("should authenticate user and should return status of value return 200", async () => {
      const user = {
        username: "MarShallOwn",
        password: "12345",
      };

      const result = await request.post("/users/authenticate").send({ user });

      setAuthToken(result.body.token);

      expect(result.status).toBe(200);
    });

    it("should return status of 400 if inputs are missing when authenticate user", async () => {
      const user = {};

      const result = await request.post("/users/authenticate").send({ user });

      expect(result.status).toBe(400);
    });
  });

  describe("Test /users of METHOD GET", () => {
    it("should return list of users and should return status of value return 200", async () => {
      const result = await request
        .get("/users")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });

  describe("Test /users/:username of METHOD GET", () => {
    it("should return sepecific user and should return status of value return 200", async () => {
      const result = await request
        .get("/users/MarShallOwn")
        .set("Authorization", `bearer ${authToken}`);

      expect(result.status).toBe(200);
    });
  });
});
