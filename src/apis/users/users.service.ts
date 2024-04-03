import { User } from "../../db/entities/user.entity";
import { IUserRepository, UserRepository } from "../../db/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuidv4 } from "uuid";

export class UsersService {
    private static usersService: UsersService;
    static getInstance() {
        if (!this.usersService) this.usersService = new UsersService();
        return this.usersService;
    }

    private readonly userRepo: IUserRepository;
    constructor() {
        this.userRepo = UserRepository.getInstance();
    }

    create(dto: CreateUserDto) {
        const user: User = {...dto, id: uuidv4()};
        this.userRepo.insert(user);
        return user;
    }
}