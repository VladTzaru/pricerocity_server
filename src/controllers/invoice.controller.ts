import { Response } from "express";
import Router from "express-promise-router";
import { wrap } from "@mikro-orm/core";

import { DI } from "../server";

import { MyRequest } from "src/types";
import { InvoiceR1 } from "../entities/InvoiceR1";

const router = Router();

// Create invoice
router.post("/new", async (req: MyRequest<InvoiceR1>, res: Response) => {
  if (
    !req.body.buyer ||
    !req.body.recipient ||
    !req.body.date ||
    !req.body.paymentDeadlineDate ||
    typeof req.body.invoiceNumberPrefix === "undefined" ||
    typeof req.body.paymentDeadlineDate === "undefined" ||
    !req.body.invoiceNumberSuffix ||
    !req.body.invoiceNumberPrefix ||
    !req.body.documentType ||
    !req.body.paymentMethod ||
    !req.body.invoiceIssuedAt ||
    req.body.items.length <= 0
  ) {
    res.status(400);
    return res.json({ message: "Provjeri da li je forma validno ispunjena." });
  }

  try {
    const invoice = new InvoiceR1(
      req.body.buyer,
      req.body.recipient,
      req.body.date,
      req.body.paymentDeadline,
      req.body.paymentDeadlineDate,
      req.body.invoiceNumberPrefix,
      req.body.invoiceNumberSuffix,
      req.body.paymentMethod,
      req.body.invoiceIssuedAt,
      req.body.items,
      req.body.status,
      req.body.summary,
      req.body.notes
    );
    wrap(invoice).assign(req.body, { em: DI.orm.em });
    await DI.invoiceRepository.persist(invoice).flush();
    res.json(invoice);
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

export const InvoiceController = router;
