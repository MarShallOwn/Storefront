import express, { Request, Response } from "express";
import CategoryStore, { Category } from "../models/category";

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  const categories = await store.index();

  res.json(categories);
};

const show = async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.params.id);

  try {
    const category = await store.show(categoryId);
    res.json(category);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

const create = async (req: Request, res: Response) => {

  if(!req.body.hasOwnProperty("category")) {
    return res.status(400).json({err: "category object missing"})
  }

  const { name } = req.body.category;

  if(!name) {
    return res.status(400).json({err: "missing categories fields"})
  }

  const category: Category = {
    name,
  };

  const newCategory = await store.create(category);

  return res.status(201).json(newCategory);
};

const deleteCategory = async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.params.id);

  try {
    const category = await store.delete(categoryId);
    res.json(category);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

const category_routes = (app: express.Application) => {
  app.get("/categories", index);
  app.post("/categories", create);
  app.get("/categories/:id", show);
  app.delete("/categories/:id", deleteCategory);
};

export default category_routes;
