import "dotenv/config";
import OrderStore from "../../models/order";
import ProductStore, { Product } from "../../models/product";
import { dummyOrderedProducts, dummyProducts } from "./dummy-model-data";

const store = new ProductStore();
const orderStore = new OrderStore();

describe("Product Model", () => {
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

  it("should have a getProductsByCategory method", () => {
    expect(store.getProductsByCategory).toBeDefined;
  });

  it("should have a getTop5PopularProducts method", () => {
    expect(store.getTop5PopularProducts).toBeDefined;
  });

  it("create should create a new product with name of 'food'", async () => {
    const product: Product = {
      name: "apple",
      price: 500,
      categoryId: 1,
    };

    const result = await store.create(product);
    expect(result as unknown).toEqual({
      id: 1,
      name: "apple",
      price: 500,
      category_id: "1",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result as unknown).toEqual([
      {
        id: 1,
        name: "apple",
        price: 500,
        category_id: "1",
      },
    ]);
  });

  it("show should get specific product by id", async () => {
    const result = await store.show(1);

    expect(result as unknown).toEqual({
      id: 1,
      name: "apple",
      price: 500,
      category_id: "1",
    });
  });

  it("getTop5Products func should return the top 5 most ordered products", async () => {
    
    for (const product of dummyProducts) {
      await store.create(product);
    }

    await orderStore.create(false, 1);

    for (const product of dummyOrderedProducts) {
      await orderStore.addProduct(
        product.quantity,
        product.orderId,
        product.productId
      );
    }


    const result = await store.getTop5PopularProducts();

    expect(result as unknown).toEqual([
      { name: 'apple', count: '7' },
      { name: 'banana', count: '5' },
      { name: 'kiwi', count: '5' },
      { name: 'orange', count: '2' },
      { name: 'guava', count: '1' }
    ]);
  });


  it('delete method should remove the product that has id of 8', async () => {

    const product: Product = {
      name: "Peach",
      price: 500,
      categoryId: 1
    };

    await store.create(product);

    const result = await store.delete(8);

    expect(result as unknown).toEqual({
      id: 8,
      name: "Peach",
      price: 500,
      category_id: "1"
    });
  });

});
