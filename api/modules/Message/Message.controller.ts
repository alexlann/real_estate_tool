import { Response, NextFunction } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PropertyService from "../Property/Property.service";
import MessageService from "./Message.service";
import { MessageBody } from "./Message.types";

export default class MessageController {
    private messageService: MessageService;
    private propertyService: PropertyService;

    constructor() {
        this.messageService = new MessageService();
        this.propertyService = new PropertyService();
    }

    all = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        // get all messages for specific agency id
        const messages = await this.messageService.allForAgent(req.user.agency.id);
        return res.json(messages);
    }

    find = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        // get message if agency id matches
        const message = await this.messageService.findOneForAgent(
            req.user.agency.id,
            parseInt(req.params.id)
        );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json(message);
    };

    create = async (
        req: AuthRequest<{}, {}, MessageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        // check if propertyId is passed, if so find property
        if(body.propertyId) {
            body.property = await this.propertyService.findOne(body.propertyId);
        }
        if (!body.property || !body.propertyId) {
            next(new NotFoundError());
            return;
        }
        // change to correct user
        body.userId = req.user.id;
        body.user = req.user;
        
        // create message
        const message = await this.messageService.createForUser(body);
        return res.json(message);
    }

    updateIsRead = async (
        req: AuthRequest<{ id: string }, {}, MessageBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        
        body.isRead = true

        // update message to isRead = true if found with agency id of user
        const message = await this.messageService.updateForAgent(
            parseInt(req.params.id),
            body
        );
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json(message);
    };

    delete = async (
        req: AuthRequest<{ id: string }>,
        res: Response,
        next: NextFunction
    ) => {
        // delete message if correct agency id
        const message = await this.messageService.deleteForAgent(req.user.agency.id, parseInt(req.params.id));
        if (!message) {
            next(new NotFoundError());
            return;
        }
        return res.json({});
    };

};