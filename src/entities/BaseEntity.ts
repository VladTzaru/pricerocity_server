import { PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

export abstract class BaseEntity {
  @PrimaryKey()
  protected _id!: ObjectId;

  @SerializedPrimaryKey()
  protected id!: string;

  @Property()
  protected createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  protected updatedAt = new Date();
}
