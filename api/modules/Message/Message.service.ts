import { Repository } from "typeorm"
import { AppDataSource } from "../../database/DataSource";
import Message from "./Message.entity";
import { MessageBody } from "./Message.types";

export default class MessageService {
    private repository: Repository<Message>;

    constructor() {
        this.repository = AppDataSource.getRepository(Message);
    }

    allForAgent = async (agencyId: number) => {
        const messages = await this.repository.find({
            where: { property: {id: agencyId} },
            relations: ["property", "property.agency", "property.category", "user"],
            order: {
                createdAt: "ASC",
            },
        });
        return messages;
    }

    findOne = async (id: number) => {
        const message = await this.repository.findOne({
            where: { id },
            relations: ["property", "user", "property.agency"],
        });
        return message;
    }

    findOneForAgent = async (agencyId: number, id: number) => {
        const message = await this.repository.findOne({
            where: { property: {id: agencyId}, id },
            relations: ["property", "user", "property.agency"],
        });
        return message;
    }

    createForUser = async (body: MessageBody) => {
        const message = await this.repository.save(this.repository.create(body));
        return message;
    }

    updateForAgent = async (id: number, body: MessageBody) => {
        let message = await this.findOne(id);
        if(message) {
            message = await this.repository.save({ ...message, ...body});
        }
        return message;
    }

    deleteForAgent = async (agencyId: number, id: number) => {
        let message = await this.findOneForAgent(agencyId, id);
        if (message) {
            await this.repository.softRemove(message);
        }
        return message;
    };
}