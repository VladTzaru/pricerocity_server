import { Request, Response } from "express";
import Router from "express-promise-router";
import { QueryOrder, wrap } from "@mikro-orm/core";

import { DI } from "../server";
import { Buyer } from "../entities/Buyer";

import { MyRequest } from "src/types";

const router = Router();

// Create buyer
router.post("/new", async (req: MyRequest<Buyer>, res: Response) => {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.zipCode ||
    !req.body.city ||
    !req.body.country ||
    !req.body.type
  ) {
    res.status(400);
    return res.json({ message: "Proveri da li su obavezna polja popunjena." });
  }

  if (req.body.type !== "Pravno lice" && req.body.type !== "Privatno lice") {
    res.status(400);
    return res.json({ message: "Tip kupca nije ispravan." });
  }

  try {
    const buyer = new Buyer(
      req.body.name,
      req.body.address,
      req.body.zipCode,
      req.body.city,
      req.body.country,
      req.body.type,
      req.body.phoneNumber,
      req.body.vatNumber
    );
    wrap(buyer).assign(req.body, { em: DI.orm.em });
    await DI.buyerRepository.persist(buyer).flush();
    res.json(buyer);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// // Update item
// router.put("/:id", async (req: MyRequest<Item>, res: Response) => {
//   if (
//     !req.body.itemNameCro ||
//     !req.body.itemNameEng ||
//     typeof req.body.retailPrice === "undefined" ||
//     typeof req.body.vat === "undefined"
//   ) {
//     res.status(400);
//     return res.json({ message: "Sva polja su obavezna." });
//   }

//   try {
//     const item = await DI.itemRepository.findOne(req.params.id);

//     if (!item) return res.status(400).json({ message: "Stavka nije nađena." });

//     wrap(item).assign(req.body);
//     await DI.itemRepository.flush();

//     res.json(item);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });

// Delete buyer
router.delete("/:id", async (req: MyRequest<Buyer>, res: Response) => {
  try {
    const buyer = await DI.buyerRepository.findOne(req.params.id);

    if (!buyer) return res.status(400).json({ message: "Stavka nije nađena." });

    await DI.buyerRepository.removeAndFlush(buyer);

    res.status(200).json({ message: "Kupac uspešno uklonjen." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all buyers
router.get("/", async (_: Request, res: Response) => {
  const buyers = await DI.buyerRepository.findAll(
    ["invoices"],
    { invoiceType: QueryOrder.DESC },
    20
  );
  res.json(buyers);
});

// Get a buyer by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const buyer = await DI.buyerRepository.findOne(req.params.id, ["invoices"]);

    if (!buyer)
      return res.status(400).json({ message: "Kupac nije pronađen." });

    res.json(buyer);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const BuyerController = router;
