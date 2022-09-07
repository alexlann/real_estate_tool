import { Repository } from "typeorm"
import { AppDataSource } from "../../database/DataSource";
import User from "./User.entity";

export default class UserService {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    all = async () => {
        const users = await this.repository.find({
            relations: ["agency"],
            order: {
                createdAt: "ASC"
            }
        });
        return users;
    }

    allForAgent = async (id) => {
        const users = await this.repository.find({
            where: { agency: {id} },
            relations: ["agency"],
            order: {
                createdAt: "ASC"
            }
        });
        return users;
    }

    findOne = async (id: number) => {
        const user = await this.repository.findOne({
            where: { id },
            relations: ["agency"],
        });
        return user;
    }

    findOneForAgent = async (agencyId: number, id: number) => {
        const user = await this.repository.findOne({
            where: { id, agency: {id: agencyId} },
            relations: ["agency"],
        });
        return user;
    }

    findOneBy = async (options) => {
        let user = await this.repository.findOneBy(options);
        user = await this.repository.findOne({
            where: { id: user.id },
            relations: ["agency"],
        });
        return user;
    }

    findByEmailWithPassword = async (email: string) => {
        const user = await this.repository
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .select("user.password")
            .getOne();
        return user;
    }

    create = async (body) => {
        const user = await this.repository.save(this.repository.create(body));
        return user;
    }

    update = async (id: number, body) => {
        let user = await this.findOne(id);
        if(user) {
            user = await this.repository.save({ ...user, ...body});
        }
        return user;
    }

    updateForAgent = async (agencyId: number, id: number, body) => {
        let user = await this.findOneForAgent(agencyId, id);
        if(user) {
            user = await this.repository.save({ ...user, ...body});
        }
        return user;
    }

    delete = async (id) => {
        let user = await this.repository.findOne({
            where: { id }, 
            relations: ["likes", "messages"]
        });
        if(user) {
            await this.repository.softDelete({ id });
        };
        return user;
    }

    deleteForAgent = async (agencyId: number, id: number) => {
        let user = await this.repository.findOne({
            where: { id, agency: {id: agencyId} }
        });
        if(user) {
            await this.repository.softDelete({ id });
        };
        return user;
    }

}