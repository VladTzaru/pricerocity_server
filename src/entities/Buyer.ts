import { Entity, Property, Unique } from "@mikro-orm/core";
import { BuyerType } from "src/types";
import { BaseEntity } from "./BaseEntity";

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
    this.phoneNumber = phoneNumber;
    this.type = type;
    this.vatNumber = vatNumber;
  }
}
