import { Injectable,  ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
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
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) =>{
                return request?.cookies?.Token;
            }]),
            secretOrKey:configModule.get('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: AuthPayload, req: Request){
        if (!payload) {
            throw new UnauthorizedException()
        }
        const user = await this.userRepo.createQueryBuilder('user')
                                        .where('user.email = :email', {email:payload.email})
                                        .getOne()
        if (!user){
            throw new UnauthorizedException()
        }
        req.user = user
        return req.user
    }
}