import { Request } from "express";

export interface MyRequest<T> extends Request {
  body: T;
}

export type BuyerType = "Privatno lice" | "Pravno lice";

export enum DocumentType {
  INVOICE_R1 = "OBRAZAC-R1",
  DELIVERY_NOTE = "OTPREMNICA",
  PROFORMA_INVOICE = "PONUDA",
}

export interface InvoiceSummary {
  shipping: number;
  totalVat: number;
  totalWithVAT: number;
  totalWithoutVat: number;
}

export type InvoiceStatus = "ISSUED" | "STORNO";
