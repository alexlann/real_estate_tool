import { Repository } from "typeorm"
import { AppDataSource } from "../../database/DataSource";
import Like from "./Like.entity";
import { LikeBody } from "./Like.types";

export default class LikeService {
    private likeRepository: Repository<Like>;

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Like);
    }

    all = async (userId: number) => {
        const likes = await this.likeRepository.find({
            where: { user: { id: userId } },
            relations: ["property", "user"],
            order: {
                createdAt: "ASC",
            }
        });
        return likes;
    }

    findOne = async (userId: number, id: number) => {
        const like = await this.likeRepository.findOne({
            where: { user: { id: userId }, id },
            relations: ["property", "user"],
    });
        return like;
    }

    create = async (body: LikeBody) => {
        const like = await this.likeRepository.save(this.likeRepository.create(body));
        return like;
    }

    delete = async (userId: number, id: number) => {
        let like = await this.findOne(userId, id);
        if (like) {
            await this.likeRepository.softRemove(like);
        }
        return like;
    };
}