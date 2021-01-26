import { Response } from "express";
import Router from "express-promise-router";
import { wrap } from "@mikro-orm/core";

import { DI } from "../server";
import { Item } from "../entities/Item";

import { MyRequest } from "src/types";

const router = Router();

// Create Item

router.post("/item", async (req: MyRequest<Item>, res: Response) => {
  if (!req.body.itemNameCro || !req.body.itemNameEng) {
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
