import express, { Request, Response } from "express";
import { Order } from "./order.type";
import * as OrdersService from './orders.service'

export const ordersRouter = express.Router();

/**
   * POST
   */
ordersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: Order = req.body;

    const newItem = await OrdersService.create(item);

    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * GET
 */
ordersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await OrdersService.findAll();

    res.status(200).send(orders);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * GET:id
 */
ordersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const order = await OrdersService.find(id);
    if (order) {
      return res.status(200).send(order);
    }
    res.status(404).send("Pedido não encontrado");
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
   * PUT
   */
 ordersRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Order = req.body;
    const updated: Order = await OrdersService.update(itemUpdate);

    if (updated.id === id) {
      return res.status(200).json(updated);
    }
    res.status(201).json(updated);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * DELETE:id
 */
ordersRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await OrdersService.remove(id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e);
  }
});