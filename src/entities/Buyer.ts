import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Buyer extends BaseEntity {
  @Property()
  name: string;

  @Property()
  address: string;

  @Property()
  zipCode: number;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property()
  phoneNumber?: number;
}
