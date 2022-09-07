import { IsDefined, IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "../BaseEntity";
import Message from "../Message/Message.entity";
// import Message from "../Message/Message.entity";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";

@Entity()
export default class Agency extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column({ unique: true })
    name: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column()
    email: string;

    @IsDefined({ always: true })
    @Column()
    phonenumber: string;

    @Column({ nullable: true })
    avatar: string;
    
    @OneToMany(() => User, (user) => user.agency, {
        cascade: true,
    })
    users: User[];

    @OneToMany(() => Property, (property) => property.agency, {
        cascade: true,
    })
    properties: Property[];
}