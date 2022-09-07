import { Response, NextFunction } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "../Agency/Agency.service";
import CategoryService from "../Category/Category.service";
import getAvatar from "../getAvatar";
import { PropertyType } from "./Property.constants";
import PropertyService from "./Property.service";
import { PropertyBody } from "./Property.types";

export default class PropertyController {
    private propertyService: PropertyService;
    private categoryService: CategoryService;
    private agencyService: AgencyService;

    constructor() {
        this.propertyService = new PropertyService();
        this.categoryService = new CategoryService();
        this.agencyService = new AgencyService();
    }

    all = async (
        req: AuthRequest<{ type: PropertyType, categoryId: number }>,
        res: Response,
        next: NextFunction
    ) => {
        let properties = [];
        // if not logged in, don't show all data
        if(!req.user) {
            const data = await this.propertyService.all(req.params.type, req.params.categoryId);
            for (let i = 0; i < Object.keys(data).length; i++) {
                properties.push({
                    id: data[i].id,
                    title: data[i].title,
                    town: data[i].town,
                    price: data[i].price,
                    description: data[i].description,
                    bathrooms: data[i].bathrooms,
                    bedrooms: data[i].bedrooms,
                    type: data[i].type,
                    isSold: data[i].isSold,
                    category: data[i].category,
                    avatar: data[i].avatar,
                })
            }
        // if user is agent, only show properties from their agency
        } else if(req.user.isAgent()) {
            properties = await this.propertyService.allForAgent(req.user.agency.id, req.params.type, req.params.categoryId);
        // show all properties and data if user or admin
        } else {
            properties = await this.propertyService.all(req.params.type, req.params.categoryId);
        }
        return res.json(properties);
    }

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        let property = {};
        // if not logged in, don't show all data
        if(!req.user) {
            const data = await this.propertyService.findOne(
                parseInt(req.params.id)
            );
            property= {
                id: data.id,
                title: data.title,
                town: data.town,
                price: data.price,
                description: data.description,
                bathrooms: data.bathrooms,
                bedrooms: data.bedrooms,
                type: data.type,
                isSold: data.isSold,
                category: data.category,
                avatar: data.avatar,
            }
        // if user is agent, only show properties from their agency
        } else if(req.user.isAgent()) {
            property = await this.propertyService.findOneForAgent(
                req.user.agency.id,
                parseInt(req.params.id)
            );
        // show all properties and data if user or admin
        } else {
            property = await this.propertyService.findOne(
                parseInt(req.params.id)
            );
        }
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };

    create = async (
        req: AuthRequest<{}, {}, PropertyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // upload avatar
        if (req.files) {
            body.avatar = getAvatar(req.files.avatar) ? getAvatar(req.files.avatar) : null;
        }

        // if user is agent, set agencyId to match with agencyId user
        if (req.user.isAgent()) {
            body.agencyId = req.user.agency.id;
        }
        // check if categoryId is passed, if so find category
        if(body.categoryId) {
            body.category = await this.categoryService.findOne(body.categoryId);
        }
        // check if agencyId is passed, if so find agency
        if(body.agencyId) {
            body.agency = await this.agencyService.findOne(body.agencyId);
        }
        // return error
        if (!body.agency || !body.category) {
            next(new NotFoundError());
            return;
        }
        // create property
        const property = await this.propertyService.create(req.body);
        return res.json(property);
    }

    update = async (
        req: AuthRequest<{ id: string }, {}, PropertyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // upload avatar
        if (req.files) {
            body.avatar = getAvatar(req.files.avatar) ? getAvatar(req.files.avatar) : null;
        }

        // if user is agent, set agencyId to agencyId of user
        if (req.user.isAgent()) {
            body.agencyId = req.user.agency.id;
        }
        // update if found
        const property = await this.propertyService.update(
            parseInt(req.params.id),
            body
        );

        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json(property);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        let property = {};
        // agent can only delete property if they have same agencyId
        if (req.user.isAgent()) {
            property = await this.propertyService.deleteForAgent(
                req.user.agency.id,
                parseInt(req.params.id)
            );
        }
        // if admin, allow to delete every property
        if (req.user.isAdmin()) {
            property = await this.propertyService.delete(parseInt(req.params.id));
        }
        if (!property) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };
};