import "dotenv/config";
import UserStore, { User } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("create should create a new user with username of 'MarShallOwn' and return truthy", async () => {
    const user: User = {
      firstname: "Marwan",
      lastname: "Samih",
      username: "MarShallOwn",
      email: "marwansamih15@gmail.com",
      password: "12345",
    };

    const result = await store.create(user);
    expect(result).toBeTruthy();
  });

  it("index method should be truthy when getting list of users", async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it("show should be truthy when getting specific user by username 'MarShallOwn'", async () => {
    const result = await store.show("MarShallOwn");

    expect(result).toBeTruthy();
  });
});
