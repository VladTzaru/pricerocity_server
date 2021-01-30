import { BaseEntity, Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { Buyer } from "./entities/Buyer";
import { InvoiceR1 } from "./entities/InvoiceR1";
import { Item } from "./entities/Item";

const options: Options = {
  type: "mongo",
  entities: [Item, Buyer, InvoiceR1, BaseEntity],
  clientUrl: process.env.MONGODB_URI,
  dbName: "pricerocityDB",
  highlighter: new MongoHighlighter(),
  debug: true,
  ensureIndexes: true,
};

export default options;
