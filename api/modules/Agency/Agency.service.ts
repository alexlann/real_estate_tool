import { Repository } from "typeorm"
import { AppDataSource } from "../../database/DataSource";
import Agency from "./Agency.entity";
import { AgencyBody } from "./Agency.types";

export default class AgencyService {
    private repository: Repository<Agency>;

    constructor() {
        this.repository = AppDataSource.getRepository(Agency);
    }

    all = async () => {
        const agencies = await this.repository.find({
            order: {
                name: "ASC",
            },
        });
        return agencies;
    }

    findOne = async (id: number) => {
        const agency = await this.repository.findOne({
            where: { id },
        });
        return agency;
    }

    create = async (body) => {
        const agency = await this.repository.save(this.repository.create(body));
        return agency;
    }

    update = async (id: number, body: AgencyBody) => {
        let agency = await this.findOne(id);
        if(agency) {
            agency = await this.repository.save({ ...agency, ...body});
        }
        return agency;
    }

    delete = async (id: number) => {
        let agency = await this.repository.findOne({
            where: { id },
            relations: ["users", "properties", "properties.images", "properties.likes"]
        });
        if (agency) {
            await this.repository.softRemove(agency);
        }
        return agency;
    };
}