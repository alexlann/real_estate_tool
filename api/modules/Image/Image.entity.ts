import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";

@Entity()
export default class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column({ unique: true })
    name: string;

    @IsDefined({ always: true })
    @ManyToOne(() => Property, (property) => property.images)
    property: Property;
}