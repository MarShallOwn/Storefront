import express, { Request, Response } from "express";
import ProductStore, { Product } from "../models/product";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();

  return res.json(products);
};

const show = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);

  try {
    const product = await store.show(productId);
    return res.json(product);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

const create = async (req: Request, res: Response) => {

  if(!req.body.hasOwnProperty("product")) {
    return res.status(400).json({err: "product object missing"})
  }

  const { name, price, categoryId } = req.body.product;

  if(!name || !price || !categoryId) {
    return res.status(400).json({err: "missing product fields"})
  }

  const product: Product = {
    name,
    price,
    categoryId,
  };

  const newProduct = await store.create(product);

  return res.status(201).json(newProduct);
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId: number = parseInt(req.params.id);
  try {
    const product = await store.delete(productId);
    return res.json(product);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

const getTop5PopularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await store.getTop5PopularProducts();
    return res.json(products);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.params;

  try {
    const products = await store.getProductsByCategory(categoryName);
    return res.json(products);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/top-5", getTop5PopularProducts);
  app.get("/products/:id", show);
  app.get("/products/category/:categoryName", getProductsByCategory);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products/:id", deleteProduct);
};

export default product_routes;
