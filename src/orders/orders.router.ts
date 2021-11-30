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