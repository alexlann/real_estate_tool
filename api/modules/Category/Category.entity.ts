import { IsDefined } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";

@Entity()
export default class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column({ unique: true })
    name: string;

    @OneToMany(() => Property, (property) => property.category, {
        cascade: true,
    })
    properties: Property[];
}