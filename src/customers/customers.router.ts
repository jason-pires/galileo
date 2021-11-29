import express, { Request, Response } from "express";
import { Customer } from "./customer.type";
import * as CustomersService from './customers.service'

export const customersRouter = express.Router();

/**
 * GET
 */
customersRouter.get('/', async (req: Request, res: Response) => {
    try {
      const items: Customer[] = await CustomersService.findAll();
  
      res.status(200).send(items);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  /**
   * GET /:id
   */
  customersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: Customer = await CustomersService.find(id);
  
      if (item) {
        return res.status(200).send(item);
      }
  
      res.status(404).send("Cliente não encontrado");
    } catch (e: any) {
      res.status(500).send(e);
    }
  });

  /**
   * POST
   */
  customersRouter.post("/", async (req: Request, res: Response) => {
    try {
      const item: Customer = req.body;
  
      const newItem = await CustomersService.create(item);
  
      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  /**
   * PUT
   */
   customersRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const itemUpdate: Customer = req.body;
      const updated: Customer = await CustomersService.update(id, itemUpdate);
  
      if (updated.id === id) {
        return res.status(200).json(updated);
      }
      res.status(201).json(updated);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  /**
   * DELETE
   */
  customersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await CustomersService.remove(id);
  
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  });