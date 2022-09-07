import { Repository } from "typeorm"
import { AppDataSource } from "../../database/DataSource";
import { PropertyType } from "./Property.constants";
import Property from "./Property.entity";
import { PropertyBody } from "./Property.types";

export default class PropertyService {
    private repository: Repository<Property>;

    constructor() {
        this.repository = AppDataSource.getRepository(Property);
    }

    all = async (type: PropertyType , categoryId: number) => {
        const properties = categoryId
        ? await this.repository.find({
                relations: ["agency", "category", "images", "images.property"],
                where: { type, category: { id: categoryId } },
                order: {
                    createdAt: "ASC",
                },
            })
        : await this.repository.find({
            relations: ["agency", "category", "images", "images.property"],
            where: { type },
            order: {
                createdAt: "ASC",
            },
        });
        return properties;
    }

    allForAgent = async (agencyId: number, type: PropertyType , categoryId: number) => {
        const properties = categoryId
        ? await this.repository.find({
                where: { agency: {id: agencyId}, type, category: { id: categoryId } },
                relations: ["agency", "category", "images", "images.property"],
                order: {
                    createdAt: "ASC",
                },
            })
        : await this.repository.find({
                where: { agency: {id: agencyId}, type, category: { id: categoryId } },
                relations: ["agency", "category", "images", "images.property"],
                order: {
                    createdAt: "ASC",
                },
        });
        return properties;
    }



    findOne = async (id: number) => {
        const property = await this.repository.findOne({
            where: { id },
            relations: ["agency", "category", "images", "images.property"]
        });
        return property;
    }

    findOneForAgent = async (agencyId: number, id: number) => {
        const property = await this.repository.findOne({
            where: { agency: {id: agencyId}, id },
            relations: ["agency", "category", "images", "images.property"]
        });
        return property;
    }

    create = async (body) => {
        const property = await this.repository.save(this.repository.create(body));
        return property;
    }

    update = async (id: number, body) => {
        let property = await this.findOne(id);
        if(property) {
            property = await this.repository.save({ ...property, ...body});
        }
        return property;
    }

    updateForAgent = async (agencyId: number, id: number, body) => {
        let property = await this.findOneForAgent(agencyId, id);
        if(property) {
            property = await this.repository.save({ ...property, ...body});
        }
        return property;
    }

    delete = async (id: number) => {
        let property = await this.repository.findOne({
            where: { id },
            relations: ["likes", "images", "messages"]
        });
        if (property) {
            await this.repository.softRemove(property);
        }
        return property;
    };

    deleteForAgent = async (agencyId: number, id: number) => {
        let property = await this.repository.findOne({
            where: { agency: {id: agencyId}, id },
            relations: ["likes", "images", "messages"]
        });
        return property;
    };
}