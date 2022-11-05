import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor (private readonly authservice: AuthService){}

    
    @Post('/login')
    async login(@Body() credentials:LoginDto) {
        return this.authservice.login(credentials)
    }

    @Post('/register')
    async register(@Body() body:RegisterUserDto){
        this.authservice.register(body)
    }

}
