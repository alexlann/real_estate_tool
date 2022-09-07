import { NextFunction, Request, Response } from "express";
import { createToken } from "../../middleware/auth";
import { AuthRequest } from "../../middleware/auth/auth.types";
import { UserRole } from "./User.constants";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    
    login = async (req: AuthRequest, res: Response, next: NextFunction) => {
        // don't show password
        const { user } = req;
        return res.json({
            user,
            token: createToken(user),
        });
    };

    register = async (
        req: Request<UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        body.agency = null;
        body.role = UserRole.User;
        // create user[]
        const userArray = await this.userService.create(req.body);
        // change to user for token
        const user = await this.userService.findOne(userArray["id"]);
        res.json({
            user,
            token: createToken(user),
        });
    }

    registerAdmin = async (
        req: Request<UserBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        body.agency = null;
        body.role = UserRole.Admin;
        // create user[]
        const userArray = await this.userService.create(req.body);
        // change to user for token
        const user = await this.userService.findOne(userArray["id"]);
        res.json({
            user,
            token: createToken(user),
        });
    }
}
