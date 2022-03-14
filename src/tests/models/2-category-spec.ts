import "dotenv/config";
import CategoryStore, { Category } from "../../models/category";

const store = new CategoryStore();

describe("Category Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });


  it("create should create a new category with name of 'food'", async () => {
    const category: Category = {
      name: "food",
    };

    const result = await store.create(category);
    expect(result).toEqual({
      id: 1,
      name: "food",
    });
  });

  it("index method should return a list of categories", async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      name: "food",
    }]);
  });

  it("show should get specific category by id", async () => {
    const result = await store.show(1);

    expect(result).toEqual({
      id: 1,
      name: "food",
    });
  });

  it('delete method should remove the category that has id of 2', async () => {

    const category: Category = {
      name: "sports",
    };

    await store.create(category);

    const result = await store.delete(2);

    expect(result).toEqual({
      id: 2,
      name: "sports"
    });
  });
});
