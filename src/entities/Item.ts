import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Item extends BaseEntity {
  @Property()
  @Unique()
  itemNameCro: string;

  @Property()
  @Unique()
  itemNameEng: string;

  @Property()
  retailPrice: number;

  @Property()
  vat: number;

  constructor(
    itemNameCro: string,
    itemNameEng: string,
    retailPrice: number,
    vat: number
  ) {
    super();
    this.itemNameEng = itemNameCro;
    this.itemNameEng = itemNameEng;
    this.retailPrice = retailPrice;
    this.vat = vat;
  }
}
