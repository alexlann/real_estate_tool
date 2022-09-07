import { NextFunction, Request, Response, Router } from "express";
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import * as path from "path";
import CategoryController from "../modules/Category/Category.controller";
import AgencyController from "../modules/Agency/Agency.controller";
import PropertyController from "../modules/Property/Property.controller";
import LikeController from "../modules/Like/Like.controller";
import MessageController from "../modules/Message/Message.controller";

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
    (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next);
        } catch (err) {
            next(err);
        }
    };

const registerOnboardingRoutes = (router: Router) => {
    // routes available when not logged in
    const authController = new AuthController();
    router.post("/login", authLocal, useMethod(authController.login));
    router.post("/register", useMethod(authController.register));
    // router.post("/registeradmin", useMethod(authController.registerAdmin));

    const propertyController = new PropertyController();
    router.get("/properties", useMethod(propertyController.all));
    router.get("/properties/:id", useMethod(propertyController.find));

    const categoryController = new CategoryController();
    router.get("/categories", useMethod(categoryController.all));
};

const registerAuthenticatedRoutes = (router: Router) => {
    // routes available when logged in
    const authRouter = Router();

    // user routes
    const categoryController = new CategoryController();
    authRouter.get("/user/categories", withRole(UserRole.User), useMethod(categoryController.all));

    const likeController = new LikeController();
    authRouter.get("/user/likes", withRole(UserRole.User), useMethod(likeController.all));
    authRouter.post("/user/likes/:id", withRole(UserRole.User), useMethod(likeController.create));
    authRouter.delete("/user/likes/:id", withRole(UserRole.User), useMethod(likeController.delete));

    const messageController = new MessageController();
    authRouter.post("/user/messages", withRole(UserRole.User), useMethod(messageController.create));

    const userController = new UserController();
    authRouter.get("/user/users/:id", withRole(UserRole.User), useMethod(userController.find));
    authRouter.patch("/user/users/:id", withRole(UserRole.User), useMethod(userController.update));

    const propertyController = new PropertyController();
    authRouter.get("/user/properties", withRole(UserRole.User), useMethod(propertyController.all));
    authRouter.get("/user/properties/:id", withRole(UserRole.User), useMethod(propertyController.find));

    // agency routes
    authRouter.get("/agent/categories", withRole(UserRole.Agent), useMethod(categoryController.all));

    const agencyController = new AgencyController();
    authRouter.get("/agent/agencies/:id", withRole(UserRole.Agent), useMethod(agencyController.find));
    authRouter.patch("/agent/agencies/:id", withRole(UserRole.Agent), useMethod(agencyController.update));

    authRouter.get("/agent/messages", withRole(UserRole.Agent), useMethod(messageController.all));
    authRouter.get("/agent/messages/:id", withRole(UserRole.Agent), useMethod(messageController.find));
    authRouter.post("/agent/messages/:id", withRole(UserRole.Agent), useMethod(messageController.updateIsRead));
    authRouter.delete("/agent/messages/:id", withRole(UserRole.Agent), useMethod(messageController.delete));

    authRouter.get("/agent/users", withRole(UserRole.Agent), useMethod(userController.all));
    authRouter.get("/agent/users/:id", withRole(UserRole.Agent), useMethod(userController.find));
    authRouter.post("/agent/users", withRole(UserRole.Agent), useMethod(userController.create));
    authRouter.patch("/agent/users/:id", withRole(UserRole.Agent), useMethod(userController.update));
    authRouter.delete("/agent/users/:id", withRole(UserRole.Agent), useMethod(userController.delete));

    authRouter.get("/agent/properties", withRole(UserRole.Agent), useMethod(propertyController.all));
    authRouter.get("/agent/properties/:id", withRole(UserRole.Agent), useMethod(propertyController.find));
    authRouter.post("/agent/properties", withRole(UserRole.Agent), useMethod(propertyController.create));
    authRouter.patch("/agent/properties/:id", withRole(UserRole.Agent), useMethod(propertyController.update));
    authRouter.delete("/agent/properties/:id", withRole(UserRole.Agent), useMethod(propertyController.delete));

    // admin routes
    authRouter.get("/admin/categories", withRole(UserRole.Admin), useMethod(categoryController.all));
    authRouter.get("/admin/categories/:id", withRole(UserRole.Admin), useMethod(categoryController.find));
    authRouter.post("/admin/categories", withRole(UserRole.Admin), useMethod(categoryController.create));
    authRouter.patch("/admin/categories/:id", withRole(UserRole.Admin), useMethod(categoryController.update));
    authRouter.delete("/admin/categories/:id", withRole(UserRole.Admin), useMethod(categoryController.delete));

    authRouter.get("/admin/agencies", withRole(UserRole.Admin), useMethod(agencyController.all));
    authRouter.get("/admin/agencies/:id", withRole(UserRole.Admin), useMethod(agencyController.find));
    authRouter.post("/admin/agencies", withRole(UserRole.Admin), useMethod(agencyController.create));
    authRouter.patch("/admin/agencies/:id", withRole(UserRole.Admin), useMethod(agencyController.update));
    authRouter.delete("/admin/agencies/:id", withRole(UserRole.Admin), useMethod(agencyController.delete));

    authRouter.get("/admin/users", withRole(UserRole.Admin), useMethod(userController.all));
    authRouter.get("/admin/users/:id", withRole(UserRole.Admin), useMethod(userController.find));
    authRouter.post("/admin/users", withRole(UserRole.Admin), useMethod(userController.create));
    authRouter.patch("/admin/users/:id", withRole(UserRole.Admin), useMethod(userController.update));
    authRouter.delete("/admin/users/:id", withRole(UserRole.Admin), useMethod(userController.delete));

    authRouter.get("/admin/properties", withRole(UserRole.Admin), useMethod(propertyController.all));
    authRouter.get("/admin/properties/:id", withRole(UserRole.Admin), useMethod(propertyController.find));
    authRouter.post("/admin/properties", withRole(UserRole.Admin), useMethod(propertyController.create));
    authRouter.patch("/admin/properties/:id", withRole(UserRole.Admin), useMethod(propertyController.update));
    authRouter.delete("/admin/properties/:id", withRole(UserRole.Admin), useMethod(propertyController.delete));

    // authenticated routes use authJWT
    router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
    // public folder
    app.use("/public", express.static(path.resolve(__dirname, "../public")));

    // onboarding routes (login, ...)
    registerOnboardingRoutes(app);

    // authenticated routes (authentication required)
    registerAuthenticatedRoutes(app);

    // fallback route, return our own 404 instead of default
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
    });
};

export { registerRoutes };
