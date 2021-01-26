import { Request, Response } from "express";
import Router from "express-promise-router";
import { wrap } from "@mikro-orm/core";

import { DI } from "../server";
import { Item } from "../entities/Item";

import { MyRequest } from "src/types";

const router = Router();

// Get all items
router.get("/", async (_: Request, res: Response) => {
  const items = await DI.itemRepository.findAll({});
  res.json(items);
});

// Create Item
router.post("/new", async (req: MyRequest<Item>, res: Response) => {
  if (
    !req.body.itemNameCro ||
    !req.body.itemNameEng ||
    !req.body.retailPrice ||
    !req.body.vat
  ) {
    res.status(400);
    return res.json({ message: "Item name is missing" });
  }

  try {
    const item = new Item(
      req.body.itemNameCro,
      req.body.itemNameEng,
      req.body.retailPrice,
      req.body.vat
    );
    wrap(item).assign(req.body);
    await DI.itemRepository.persist(item).flush();
    res.json(item);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const ItemController = router;
