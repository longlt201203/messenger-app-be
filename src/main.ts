import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { UsersController } from "./apis/users/users.controller";
import { AuthController } from "./apis/auth/auth.controller";
import { LocalFilesController } from "./apis/local-files/local-files.controller";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", UsersController);
app.use("/auth", AuthController);
app.use("/local-files", LocalFilesController);

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
}

app.use(errorHandler);

app.listen(3000, () => {
    console.log("App listening at port 3000");
});