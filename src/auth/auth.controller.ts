import { Body, Controller, Res } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor (private readonly authservice: AuthService){}

    
    @Post('/login')
    async login(@Body() credentials:LoginDto, @Res() res: Response) {
       const {token, user} =  await  this.authservice.login(credentials)
       res.cookie('IsAuthenticated', true, {maxAge:2*60*1000})
       res.cookie('Authenticated', token, {
        httpOnly: true,
        maxAge:2*60*1000,
       })

       return res.send({success:true, user})
    }

    @Post('/register')
    async register(@Body() body:RegisterUserDto){
        this.authservice.register(body)
    }

}
