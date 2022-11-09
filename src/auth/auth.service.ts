import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import {UnauthorizedException } from '@nestjs/common'
import { AuthPayload } from './auth.payload';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
              private readonly configModule: ConfigService,
              private readonly jwtService: JwtService,
  ){}
  
  async  login(credentials:LoginDto, res: Response){
    
      const user = await  this.userRepo.createQueryBuilder('user')
                                        .addSelect('user.password')
                                        .where('user.email = :email',{email:credentials.email})
                                        .getOne()                                                     
      if(user === null) {
        console.log(user);
        throw new UnauthorizedException('Invalid Credentials')
      } 
      
      
      const isValid = await user.comparePassword(credentials.password, user.password)

      if (!isValid){

        throw new UnauthorizedException('Email or Password incorrect')
    } else {
      
      const token =  await this.signToken(user)

      delete user.password

      res.cookie('Token', token, {
        httpOnly:true,
        maxAge: this.configModule.get('COOKIE_EXPIRATION')
      } )

      res.send({sucess:true,message:'Login Successfull', }).json()

    }
  }


  async register(credentials:RegisterUserDto){
    const { email } = credentials

    const existingUser = await this.userRepo.createQueryBuilder('user')
                                             .where('user.email = :email', {email:credentials.email})
                                             .getOne()

    if (existingUser){
      throw new BadRequestException('Email has already been taken.')
    } 

    const user = await this.userRepo.create(credentials)

    await this.userRepo.save(user)

    return user    
  }

  async signOut(res:Response){
   res.clearCookie('Token')
   res.send({success:true, message:'Logout Successfull'}).json()
   
  }

  async signToken(payload:AuthPayload){
    return await this.jwtService.signAsync({
      id:payload.id,
      email:payload.email
    })
  }
  

}
