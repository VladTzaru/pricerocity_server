import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { DocumentType } from "../types";
import { BaseEntity } from "./BaseEntity";
import { Buyer } from "./Buyer";

@Entity()
export class InvoiceR1 extends BaseEntity {
  @ManyToOne(() => Buyer)
  buyer: Buyer;

  @Property()
  recipient: string;

  @Property()
  date: Date;

  @Property()
  paymentDeadline: number;

  @Property()
  paymentDeadlineDate: Date;

  @Property()
  invoiceNumberPrefix: number;

  @Property()
  invoiceNumberSuffix: string;

  @Property()
  paymentMethod: string;

  @Property()
  invoiceIssuedAt: string;

  @Property()
  readonly documentType: DocumentType.INVOICE_R1;

  @Property()
  notes?: string;

  constructor(
    buyer: Buyer,
    recipient: string,
    date: Date,
    paymentDeadline: number,
    paymentDeadlineDate: Date,
    invoiceNumberPrefix: number,
    invoiceNumberSuffix: string,
    paymentMethod: string,
    invoiceIssuedAt: string,
    notes?: string
  ) {
    super();
    this.buyer = buyer;
    this.recipient = recipient;
    this.date = date;
    this.paymentDeadline = paymentDeadline;
    this.paymentDeadlineDate = paymentDeadlineDate;
    this.invoiceNumberPrefix = invoiceNumberPrefix;
    this.invoiceNumberSuffix = invoiceNumberSuffix;
    this.paymentMethod = paymentMethod;
    this.invoiceIssuedAt = invoiceIssuedAt;
    this.notes = notes;
  }
}
