import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Agency from "../Agency/Agency.entity";
import { BaseEntity } from "../BaseEntity";
import Image from "../Image/Image.entity";
import Message from "../Message/Message.entity";
import Category from "../Category/Category.entity";
import Like from "../Like/Like.entity";
import { IsDefined } from "class-validator";
import { PropertyType } from "./Property.constants";

@Entity()
export default class Property extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    title: string;

    @IsDefined({ always: true })
    @Column()
    town: string;

    @IsDefined({ always: true })
    @Column()
    street: string;

    @IsDefined({ always: true })
    @Column()
    price: number;

    @IsDefined({ always: true })
    @Column()
    surfaceArea: number;

    @IsDefined({ always: true })
    @Column()
    buildYear: number;

    @IsDefined({ always: true })
    @Column()
    description: string;

    @IsDefined({ always: true })
    @Column()
    bathrooms: number;

    @IsDefined({ always: true })
    @Column()
    bedrooms: number;

    @Column({ nullable: true })
    avatar: string;

    @IsDefined({ always: true })
    @Column({
        type: "enum",
        enum: PropertyType,
    })
    type: PropertyType;

    @Column({default: false})
    isSold: boolean;

    @IsDefined({ always: true })
    @ManyToOne(() => Agency, (agency) => agency.properties)
    agency: Agency;

    @IsDefined({ always: true })
    @ManyToOne(() => Category, (category) => category.properties)
    category: Category;

    @OneToMany(() => Message, (message) => message.property, {
        cascade: true,
    })
    messages: Message[];

    @OneToMany(() => Image, (image) => image.property, {
        cascade: true,
    })
    images: Image[];

    @OneToMany(() => Like, (like) => like.property, {
        cascade: true,
    })
    likes: Like[];
}