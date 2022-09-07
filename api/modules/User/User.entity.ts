import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { hash, compare } from "bcrypt";
import { UserRole } from "./User.constants";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import Agency from "../Agency/Agency.entity";
import Like from "../Like/Like.entity";
import Message from "../Message/Message.entity";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    firstname: string;

    @IsDefined({ always: true })
    @Column()
    lastname: string;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column({ unique: true })
    email: string;

    @IsDefined({ always: true })
    @Column()
    phonenumber: string;

    @IsDefined({ groups: ["create"] })
    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @IsDefined({ always: true })
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;

    @ManyToOne(() => Agency, (agency) => agency.users)
    agency: Agency;

    @OneToMany(() => Message, (message) => message.user, {
        cascade: true,
    })
    messages: Message[];

    @OneToMany(() => Like, (like) => like.user, {
        cascade: true,
    })
    likes: Like[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

    async checkPassword(passwordToCheck: string) {
        return await compare(passwordToCheck, this.password);
    }

    isAdmin() {
        return this.role === UserRole.Admin;
    }

    isAgent() {
        return this.role === UserRole.Agent;
    }
}
