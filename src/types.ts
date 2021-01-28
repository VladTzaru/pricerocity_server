import { Request } from "express";

export interface MyRequest<T> extends Request {
  body: T;
}

export type BuyerType = "Privatno lice" | "Pravno lice";
