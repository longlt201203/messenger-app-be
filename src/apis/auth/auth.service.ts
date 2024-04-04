import * as jwt from "jsonwebtoken";
import { IUserRepository, UserRepository } from "../../db/repositories/user.repository";
import { User } from "../../db/entities/user.entity";

const JWT_SECRET = "longdeptraikhoiphaicai~";
const JWT_ISSUER = "longdeptraichuconaivaodaynua";

export class AuthService {
    private static authService: AuthService;
    static getInstance() {
        if (!this.authService) this.authService = new AuthService();
        return this.authService;
    }

    private readonly userRepo: IUserRepository;
    constructor() {
        this.userRepo = UserRepository.getInstance();
    }

    signJwtToken(subject: string) {
        return jwt.sign({}, JWT_SECRET, {
            subject: subject,
            issuer: JWT_ISSUER,
            expiresIn: "2d"
        });
    }

    verifyJwt(token: string) {
        const subject = jwt.verify(token, JWT_SECRET, {
            issuer: JWT_ISSUER,
        }).sub;
        return typeof subject == "string" ? subject : "";
    }

    loginById(userId: string) {
        const user = this.userRepo.findById(userId);
        if (!user) {
            throw new Error("User not found!");
        }
        return this.signJwtToken(userId);
    }

    verifyAccessToken(token: string) {
        let user: User | undefined = undefined;
        try {
            const userId = this.verifyJwt(token);
            user = this.userRepo.findById(userId);
        } catch (err) {
            if (!(err == jwt.JsonWebTokenError)) {
                console.log(err);
            }
        }
        return user;
    }
}