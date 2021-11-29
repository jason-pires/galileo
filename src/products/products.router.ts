import express, { Request, Response } from "express";
import { Product } from "./products.type";
import * as ProductsService from './products.service'

export const productsRouter = express.Router();

/**
 * GET
 */
productsRouter.get('/', async (req: Request, res: Response) => {
    try {
      const items: Product[] = await ProductsService.findAll();
  
      res.status(200).send(items);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  /**
   * GET /:id
   */
  productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: Product = await ProductsService.find(id);
  
      if (item) {
        return res.status(200).send(item);
      }
  
      res.status(404).send("Produto não encontrado");
    } catch (e) {
      res.status(500).send(e);
    }
  });

  /**
   * POST
   */
  productsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const item: Product = req.body;
  
      const newItem = await ProductsService.create(item);
  
      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  /**
   * PUT
   */
   productsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const itemUpdate: Product = req.body;
      const updated: Product = await ProductsService.update(id, itemUpdate);
  
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
  productsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await ProductsService.remove(id);
  
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  });