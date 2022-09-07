import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Agency from "../Agency/Agency.entity";
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";

@Entity()
export default class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    message: string;

    @Column({default: false})
    isRead: boolean;

    @IsDefined({ always: true })
    @ManyToOne(() => Property, (property) => property.messages)
    property: Property;

    @IsDefined({ always: true })
    @ManyToOne(() => User, (user) => user.messages)
    user: User;
}