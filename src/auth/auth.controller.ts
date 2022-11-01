import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly authservice: AuthService){}

    
    @Post('login')
    login():any {

    }
}
