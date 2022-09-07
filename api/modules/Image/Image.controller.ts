import { Response, NextFunction } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import ImageService from "./Image.service";
import { ImageBody } from "./Image.types";
import PropertyService from "../Property/Property.service"; 

export default class ImageController {
    private imageService: ImageService;
    private propertyService: PropertyService;

    constructor() {
        this.imageService = new ImageService();
        this.propertyService = new PropertyService();
    }

    all = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const images = await this.imageService.all();
        return res.json(images);
    }

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const image = await this.imageService.findOne(
            parseInt(req.params.id)
        );
        if (!image) {
            next(new NotFoundError());
            return;
        }
        return res.json(image);
    };

    create = async (
        req: AuthRequest<{}, {}, ImageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if propertyId is passed, if so find property
        if(body.propertyId) {
            body.property = await this.propertyService.findOne(body.propertyId);
        }
        // create image
        const image = await this.imageService.create(body);
        return res.json(image);
    }

    update = async (
        req: AuthRequest<{ id: string }, {}, ImageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if propertyId is passed, if so find property
        if(body.propertyId) {
            body.property = await this.propertyService.findOne(body.propertyId);
        }
        // update image
        const image = await this.imageService.update(
            parseInt(req.params.id),
            req.body
        );
        if (!image) {
            next(new NotFoundError());
            return;
        }
        return res.json(image);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const image = await this.imageService.delete(parseInt(req.params.id));
        if (!image) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

};