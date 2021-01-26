import express from "express";
import dotenv from "dotenv";
import { MikroORM } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";
import { Item } from "./entities/Item";

const main = async () => {
  dotenv.config();

  // DB config starts
  const orm = await MikroORM.init<MongoDriver>({
    entities: [Item],
    dbName: "pricerocityDB",
    type: "mongo",
    clientUrl: process.env.MONGODB_URI,
  });

  await orm.em.getDriver().createCollections();
  // DB config ends

  const app = express();
  const port = 5000;

  app.get("/", (_, res) => {
    res.send("Hello there");
  });

  app.listen(port, () => {
    console.log(`Listenin at port ${port}`);
  });
};

main().catch(console.error);
