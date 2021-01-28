import { Response } from "express";
import Router from "express-promise-router";
import { wrap } from "@mikro-orm/core";

import { DI } from "../server";
import { Buyer } from "../entities/Buyer";

import { MyRequest } from "src/types";

const router = Router();

// Create buyer
router.post("/new", async (req: MyRequest<Buyer>, res: Response) => {
  console.log(req.body.name);
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.zipCode ||
    !req.body.city ||
    !req.body.country ||
    !req.body.type ||
    typeof req.body.vatNumber === undefined
  ) {
    res.status(400);
    return res.json({ message: "Proveri da li su obavezna polja popunjena." });
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
    wrap(buyer).assign(req.body);
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

// // Delete item
// router.delete("/:id", async (req: MyRequest<Item>, res: Response) => {
//   try {
//     const item = await DI.itemRepository.findOne(req.params.id);

//     if (!item) return res.status(400).json({ message: "Stavka nije nađena." });

//     await DI.itemRepository.removeAndFlush(item);

//     res.status(200).json({ message: "Stavka uspešno uklonjena." });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });

// // Get all items
// router.get("/", async (_: Request, res: Response) => {
//   const items = await DI.itemRepository.findAll({});
//   res.json(items);
// });

// // Get an item by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const item = await DI.itemRepository.findOne(req.params.id);

//     if (!item) return res.status(400).json({ message: "Stavka nije nađena." });

//     res.json(item);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });

export const BuyerController = router;
