import "reflect-metadata";
import { DataSource, } from "typeorm";
import Agency from "../modules/Agency/Agency.entity";
import Category from "../modules/Category/Category.entity";
import Property from "../modules/Property/Property.entity";
import User from "../modules/User/User.entity";
import Like from "../modules/Like/Like.entity";
import Message from "../modules/Message/Message.entity";
import Image from "../modules/Image/Image.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { 
        rejectUnauthorized: false
    },
    synchronize: true,
    logging: false,
    entities: [Property, User, Message, Category, Agency, Like, Image],
    migrations: [],
    subscribers: [],
});
