import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import {UnauthorizedException, InternalServerErrorException} from '@nestjs/common'

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
              private readonly configModule: ConfigService,
              private readonly jwtService: JwtService,
  ){}
  
  async  login(credentials:LoginDto) {
    try {
      const user = await  this.userRepo.createQueryBuilder('user')
                                        .where('user.email = :email',{email:credentials.email})
                                        .getOne()
      const isValid = await user.comparePassword(credentials.password)
      if (!isValid) {
        throw new UnauthorizedException('Invalid Credentials')
      }
      return user
      
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }


  async register(credentials:RegisterUserDto){
    const { email } = credentials

    const existingUser = this.userRepo.findBy({email})

    if (existingUser){
      throw new BadRequestException('Email has already been taken.')
    } else {
      const user = await this.userRepo.create(credentials)
      await this.userRepo.save(user)
      const payload = {firstname:user.firstname}
      return user
    }
  }
   

//  async  signPayload(payload:any) {
//   returnasync  sign(payload,'secretkey',{expiresIn:'12h'})
//  }

//   async validateUser(payload: any) {
//     return await this.
//   }

  

}
