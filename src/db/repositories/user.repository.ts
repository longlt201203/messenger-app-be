import { BaseRepository, IBaseRepository } from "../base-repository";
import { User } from "../entities/user.entity";

export interface IUserRepository extends IBaseRepository<User> {
    findById(id: string): User | null;
}

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    private static userRepo: UserRepository;
    static getInstance(): IUserRepository {
        if (!this.userRepo) this.userRepo = new UserRepository();
        return this.userRepo;
    }
    
    constructor() {
        super("users");
    }

    findById(id: string) {
        return this.data.find(user => user.id === id) || null;
    }
}