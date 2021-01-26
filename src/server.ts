import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";

// My Imports
import { Item } from "./entities/Item";
import { ItemController } from "./controllers";

dotenv.config();

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  itemRepository: EntityRepository<Item>;
};

const app = express();
const port = 5000;

(async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.itemRepository = DI.orm.em.getRepository(Item);

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));

  // Routes
  app.use("/item", ItemController);

  // Catch all route
  app.use((_req, res) => res.status(404).json({ message: "No route found" }));

  app.listen(port, () => {
    console.log(`Listenin at port ${port}`);
  });
})();
