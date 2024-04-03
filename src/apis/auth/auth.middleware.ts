import { NextFunction, Response } from "express";
import { AuthService } from "./auth.service";
import { Request } from "../../etc/request";

const authService = AuthService.getInstance();

export function authenticated() {
    function check(req: Request) {
        let token = "";
        const authorization = req.headers.authorization;
        if (authorization && authorization.startsWith("Bearer ")) {
            token = authorization.slice("Bearer ".length, authorization.length);
        }
        if (!token) return false;
        const user = authService.verifyAccessToken(token);
        if (!user) return false;
        req.user = user;
        return true;
    }

    return (req: Request, res: Response, next: NextFunction) => {
        if (check(req)) {
            next();
        } else {
            res.status(401).send({ message: "Unauthorization" });
        }
    }
}