import { IsDefined } from "class-validator";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";

@Entity()
export default class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @ManyToOne(() => Property, (property) => property.likes)
    property: Property;

    @IsDefined({ always: true })
    @ManyToOne(() => User, (user) => user.likes)
    user: User;
}