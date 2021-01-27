import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { Item } from "./entities/Item";

const options: Options = {
  type: "mongo",
  entities: [Item],
  clientUrl: process.env.MONGODB_URI,
  dbName: "pricerocityDB",
  highlighter: new MongoHighlighter(),
  debug: true,
  ensureIndexes: true,
};

export default options;
