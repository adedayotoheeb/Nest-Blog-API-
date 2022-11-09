import { Body, ClassSerializerInterceptor, Controller, Res, UseInterceptors, Req} from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor (private readonly authservice: AuthService){}

    @Post('login')
    async login(@Body() credentials:LoginDto, @Res({passthrough:true}) res: Response) {
      return await this.authservice.login(credentials, res)
    }

    @Post('register')
    async register(@Body() credentials:RegisterUserDto){
        return await this.authservice.register(credentials)
    }

    @Get('signout')
    async signOut(res:Response){
      return await this.authservice.signOut(res)
    }

}
