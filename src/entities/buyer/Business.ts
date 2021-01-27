import { Entity, Property } from "@mikro-orm/core";
import { Buyer } from "./Buyer";

@Entity()
export class Business extends Buyer {
  @Property()
  vatNumber: number;
}
