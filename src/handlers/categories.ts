import express, { Request, Response } from "express";
import CategoryStore, { Category } from "../models/category";

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  try {
    const categories = await store.index();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.params.id);

  try {
    const category = await store.show(categoryId);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  if (!req.body.hasOwnProperty("category")) {
    return res.status(400).json({ err: "category object missing" });
  }

  const { name } = req.body.category;

  if (!name) {
    return res.status(400).json({ err: "missing categories fields" });
  }

  const category: Category = {
    name,
  };

  try {
    const newCategory = await store.create(category);

    return res.status(201).json(newCategory);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const categoryId: number = parseInt(req.params.id);

  try {
    const category = await store.delete(categoryId);
    res.json(category);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const category_routes = (app: express.Application) => {
  app.get("/categories", index);
  app.post("/categories", create);
  app.get("/categories/:id", show);
  app.delete("/categories/:id", deleteCategory);
};

export default category_routes;
