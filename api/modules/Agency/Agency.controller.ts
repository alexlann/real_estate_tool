import { Response, NextFunction } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import getAvatar from "../getAvatar";
import AgencyService from "./Agency.service";
import { AgencyBody } from "./Agency.types";

export default class AgencyController {
    private agencyService: AgencyService;

    constructor() {
        this.agencyService = new AgencyService();
    }

    all = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const agencies = await this.agencyService.all();
        return res.json(agencies);
    }

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        // if agent, replace id to match agency of user
        if (req.user.isAgent()) {
            req.params.id = `${req.user.agency.id}`
        }
        const agency = await this.agencyService.findOne(parseInt(req.params.id));
        if (!agency) {
            next(new NotFoundError());
            return;
        }
        return res.json(agency);
    };

    create = async (
        req: AuthRequest<{}, {}, AgencyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (req.files) {
            body.avatar = getAvatar(req.files.avatar) ? getAvatar(req.files.avatar) : null;
        }
        const agency = await this.agencyService.create(body);
        return res.json(agency);
    }

    update = async (
        req: AuthRequest<{ id: string }, {}, AgencyBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (req.files) {
            body.avatar = getAvatar(req.files.avatar) ? getAvatar(req.files.avatar) : null;
        }
        // if agent, replace id to match agency of user
        if (req.user.isAgent()) {
            req.params.id = `${req.user.agency.id}`
        }
        const agency = await this.agencyService.update(parseInt(req.params.id), body);
        if (!agency) {
            next(new NotFoundError());
            return;
        }
        return res.json(agency);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const agency = await this.agencyService.delete(parseInt(req.params.id));
        // if agent, replace id to match agency of user
        if (req.user.isAgent()) {
            req.params.id = `${req.user.agency.id}`
        }
        if (!agency) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

};