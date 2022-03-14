import express, { Request, Response } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import OrderStore, { Order } from "../models/order";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);

  try {
    const order = await store.show(orderId);
    res.json(order);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  if (!req.body.hasOwnProperty("order")) {
    return res.status(400).json({ err: "order object missing" });
  }

  const { isCompleted, userId } = req.body.order;

  if (!isCompleted || !userId) {
    return res.status(400).json({ err: "missing order fields" });
  }

  try {
    const newOrder = await store.create(
      isCompleted as unknown as boolean,
      parseInt(userId)
    );

    return res.status(201).json(newOrder);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);

  try {
    const order = await store.delete(orderId);
    res.json(order);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id);

  if (!req.body.hasOwnProperty("product")) {
    return res.status(400).json({ err: "product object missing" });
  }

  const { productId, quantity } = req.body.product;

  if (!productId || !quantity) {
    return res.status(400).json({ err: "missing product fields" });
  }

  try {
    const addedProduct = await store.addProduct(
      quantity,
      orderId,
      parseInt(productId)
    );
    return res.json(addedProduct);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const getAllOrdersforUser = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const orders = await store.getAllOrdersforUser(userId);
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const getAllOrdersforUserByStatus = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const { isCompleted } = req.params;

  if (!userId || !isCompleted) {
    return res.status(400).json({ err: "params shouldn't be empty" });
  }

  try {
    const orders = await store.getAllOrdersforUserByStatus(
      userId,
      JSON.parse(isCompleted)
    );
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({ err: `${err}` });
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders/:id", verifyAuthToken, show);
  app.delete("/orders/:id", verifyAuthToken, deleteOrder);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
  app.get("/orders/user/:id", verifyAuthToken, getAllOrdersforUser);
  app.get(
    "/orders-by-status/:isCompleted/user/:id",
    verifyAuthToken,
    getAllOrdersforUserByStatus
  );
};

export default order_routes;
