import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Item {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  itemNameCro: string;

  @Property()
  itemNameEng: string;

  @Property()
  retailPrice: number;

  @Property()
  vat: number;
}
