import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "../Agency/Agency.service";
import getAvatar from "../getAvatar";
import { UserRole } from "./User.constants";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class UserController {
    private userService: UserService;
    private agencyService: AgencyService;

    constructor() {
        this.userService = new UserService();
        this.agencyService = new AgencyService();
    }

    all = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const users = req.user.isAdmin()
            ? await this.userService.all()
            : await this.userService.allForAgent(req.user.agency.id);
        return res.json(users);
    };

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        let user = {};
        // if role admin, show all users
        if(req.user.isAdmin()) {
            user = await this.userService.findOne(parseInt(req.params.id));
        // if role agent, only show users with same agencyId
        } else if(req.user.isAgent()) {
            user = await this.userService.findOneForAgent(req.user.agency.id, parseInt(req.params.id));
        // if role user, only show account
        } else {
            user = await this.userService.findOne(req.user.id);
        }
        if (!user) {
            next(new NotFoundError());
        }
        return res.json(user);
    };

    create = async (
        req: AuthRequest<{}, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        if (req.files) {
            body.avatar = getAvatar(req.files.avatar) ? getAvatar(req.files.avatar) : null;
        }
        // if admin, allow all
        if (req.user.isAdmin()) {
            body.agency = body.agencyId
                ? await this.agencyService.findOne(body.agencyId)
                : null;
            body.role = body.role
                ? body.role
                : UserRole.User;
            // when created user is connected to agency, make agent
            body.role = body.agency
                ? UserRole.Agent
                : body.role;
        } else {
            // if user is agent, make user always agent with same agencyId
            body.agency = await this.agencyService.findOne(req.user.agency.id);
            body.role = UserRole.Agent;
        }
        const user = await this.userService.create(body);
        return res.json(user);
    };

    update = async (
        req: AuthRequest<{ id: string }, {}, UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { body } = req;
            // upload avatar
            if (req.files) {
                body.avatar = getAvatar(req.files.avatar) ? getAvatar(req.files.avatar) : null;
            }
            // if role user, set userId to own userId, don't allow to have agencyId and set role to user
            if (!req.user.isAdmin() && !req.user.isAgent()) {
                req.params.id = `${req.user.id}`;
                body.agencyId = null;
                body.role = UserRole.User;
            };
            // if role agent, set role to agent and set agencyId to same agencyId
            if (req.user.isAgent()) {
                body.agencyId = req.user.agency.id;
                body.role = UserRole.Agent;
            }
            // check relations
            if(body.agencyId) {
                body.agency = await this.agencyService.findOne(body.agencyId);
                body.role = UserRole.Agent;
            }
            // update user
            const user = req.user.isAgent()
                ? await this.userService.updateForAgent(
                    req.user.agency.id,
                    parseInt(req.params.id),
                    body
                ) : await this.userService.update(parseInt(req.params.id), body); 
            if (!user) {
                next(new NotFoundError());
            }
            return res.json(user);
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // if user is admin, allow to delete every user, if user is agent, only allow to delete users with same agencyId
            const user = req.user.isAdmin()
                ? await this.userService.delete(parseInt(req.params.id))
                : await this.userService.deleteForAgent(
                    req.user.agency.id,
                    parseInt(req.params.id)
                );
            if (!user) {
                next(new NotFoundError());
            }
            return res.json({});
        } catch (err) {
            next(err);
        }
    };
}