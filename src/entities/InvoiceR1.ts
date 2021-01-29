import { Cascade, Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Buyer } from "./Buyer";

@Entity()
export class InvoiceR1 extends BaseEntity {
  @Property()
  recipient: string;

  @Property()
  date: Date;

  @Property()
  paymentDeadline: number;

  @Property()
  invoiceNumberPrefix: number;

  @Property()
  invoiceNumberSuffix: string;

  @Property()
  invoiceType: string;

  @Property()
  paymentMethod: string;

  @Property()
  invoiceIssuedAt: string;

  @Property()
  notes?: string;

  @ManyToOne(() => Buyer, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
  buyer: Buyer;

  constructor(
    buyer: Buyer,
    recipient: string,
    date: Date,
    paymentDeadline: number,
    invoiceNumberPrefix: number,
    invoiceNumberSuffix: string,
    invoiceType: string,
    paymentMethod: string,
    invoiceIssuedAt: string,
    notes?: string
  ) {
    super();
    this.buyer = buyer;
    this.recipient = recipient;
    this.date = date;
    this.paymentDeadline = paymentDeadline;
    this.invoiceNumberPrefix = invoiceNumberPrefix;
    this.invoiceNumberSuffix = invoiceNumberSuffix;
    this.invoiceType = invoiceType;
    this.paymentMethod = paymentMethod;
    this.invoiceIssuedAt = invoiceIssuedAt;
    this.notes = notes;
  }
}
