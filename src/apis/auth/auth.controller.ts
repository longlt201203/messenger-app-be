import { Router } from "express";
import { authenticated } from "./auth.middleware";
import { Request } from "../../etc/request";
import { AuthService } from "./auth.service";

const authService = AuthService.getInstance();
export const AuthController = Router();

AuthController.get("/login", (req: Request, res, next) => {
    const query = req.query;

    if (query.userId && typeof query.userId === "string") {
        try {
            const token = authService.loginById(query.userId);
            res.status(200).send({ accessToken: token });   
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).send({ message: err.message });
            } else {
                console.log(err);
                res.status(500).send({ message: "Unknow error!" });
            }
        }
    } else {
        res.status(400).send({ message: "Wrong User ID" });
    }
    
});

AuthController.get("/profile", authenticated(), (req: Request, res, next) => {
    res.status(200).send(req.user);
});