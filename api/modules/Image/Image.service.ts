import { Repository } from "typeorm"
import { AppDataSource } from "../../database/DataSource";
import Image from "./Image.entity";
import { ImageBody } from "./Image.types";

export default class ImageService {
    private imageRepository: Repository<Image>;

    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image);
    }

    all = async () => {
        const images = await this.imageRepository.find({
            relations: ["property"],
            order: {
                createdAt: "ASC",
            }
        });
        return images;
    }

    findOne = async (id: number) => {
        const image = await this.imageRepository.findOne({
            where: { id },
            relations: ["property"],
    });
        return image;
    }

    create = async (body: ImageBody) => {
        const image = await this.imageRepository.save(this.imageRepository.create(body));
        return image;
    }

    update = async (id: number, body: ImageBody) => {
        let image = await this.findOne(id);
        if(image) {
            image = await this.imageRepository.save({ ...image, ...body});
        }
        return image;
    }

    delete = async (id: number) => {
        let image = await this.imageRepository.findOneBy({id});
        if (image) {
            await this.imageRepository.softRemove(image);
        }
        return image;
    };
}