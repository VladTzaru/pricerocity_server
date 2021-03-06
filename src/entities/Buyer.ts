import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BuyerType } from "src/types";
import { BaseEntity } from "./BaseEntity";
import { InvoiceR1 } from "./InvoiceR1";

@Entity()
export class Buyer extends BaseEntity {
  @Property()
  @Unique()
  name: string;

  @Property()
  address: string;

  @Property()
  zipCode: string;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property()
  phoneNumber?: string;

  @Property()
  type: BuyerType;

  @Property()
  vatNumber?: string;

  @OneToMany(() => InvoiceR1, (i) => i.buyer, { cascade: [Cascade.ALL] })
  invoices = new Collection<InvoiceR1>(this);

  constructor(
    name: string,
    address: string,
    zipCode: string,
    city: string,
    country: string,
    type: BuyerType,
    phoneNumber?: string,
    vatNumber?: string
  ) {
    super();
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
    this.type = type;
    this.phoneNumber = phoneNumber;
    this.vatNumber = vatNumber;
  }
}
