import { Response, NextFunction } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import LikeService from "./Like.service";
import { LikeBody } from "./Like.types";
import PropertyService from "../Property/Property.service"; 

export default class LikeController {
    private likeService: LikeService;
    private propertyService: PropertyService;

    constructor() {
        this.likeService = new LikeService();
        this.propertyService = new PropertyService();
    }

    all = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        // get all likes from specific user id
        const likes = await this.likeService.all(req.user.id);
        return res.json(likes);
    }

    create = async (
        req: AuthRequest<{id: string}, {}, LikeBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if propertyId is passed, if so find property
        if(req.params.id) {
            body.propertyId = parseInt(req.params.id);
            body.property = await this.propertyService.findOne(parseInt(req.params.id));
            if (!body.property) {
                next(new NotFoundError());
                return;
            }
        }
        // add user id
        body.userId = req.user.id;
        body.user = req.user;
        // create like
        const like = await this.likeService.create(body);
        return res.json(like);
    }

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const like = await this.likeService.delete(req.user.id, parseInt(req.params.id));
        if (!like) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

};