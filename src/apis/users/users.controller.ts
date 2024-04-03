import { Router } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

const usersService = UsersService.getInstance();
export const UsersController = Router();

UsersController.post<any, any, any, CreateUserDto>("/", (req, res, next) => {
    const user = usersService.create(req.body);
    res.status(200).send(user);
});