import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { use } from "passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Repository } from "typeorm";
import { AuthPayload } from "./auth.payload";
import { User } from "./entities/user.entity";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configModule: ConfigService,
        @InjectRepository(User) private readonly userRepo: Repository<User>
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretKey:configModule.get('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: AuthPayload){
        const { email } = payload
        const user = this.userRepo.find({ where:{email}})
        if (!user){
            throw new UnauthorizedException();
        }
        return user
    }
}