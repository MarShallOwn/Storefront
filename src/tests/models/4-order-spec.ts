import "dotenv/config";
import OrderStore, { Order } from "../../models/order";
import { expectedOrderOutput } from "./dummy-model-data";

const store = new OrderStore();

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("should have a getAllActiveOrdersforUser method", () => {
    expect(store.getAllActiveOrdersforUser).toBeDefined;
  });

  it("should have a addProduct method", () => {
    expect(store.addProduct).toBeDefined;
  });

  it("should have a getAllOrdersforUser method", () => {
    expect(store.getAllOrdersforUser).toBeDefined;
  });

  it("should have a getAllOrdersforUserByStatus method", () => {
    expect(store.getAllOrdersforUserByStatus).toBeDefined;
  });

  it("create should create a new order with status of completed", async () => {
    const result = await store.create(true, 1);
    expect(result as unknown).toEqual({
      id: 2,
      status: "completed",
      user_id: "1",
    });
  });

  it("create should create a new order with status of active", async () => {
    const result = await store.create(false, 1);
    expect(result as unknown).toEqual({
      id: 3,
      status: "active",
      user_id: "1",
    });
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();

    expect(result as unknown).toEqual(expectedOrderOutput);
  });

  it("show should get specific order by id 2", async () => {
    const result = await store.show(2);

    expect(result as unknown).toEqual({
      id: 2,
      status: "completed",
      user_id: "1",
    });
  });


  it('delete method should remove the order that has id of 4', async () => {

    await store.create(true, 1);

    const result = await store.delete(4);

    expect(result as unknown).toEqual({
      id: 4,
      status: "completed",
      user_id: "1"
    });
  });
});
