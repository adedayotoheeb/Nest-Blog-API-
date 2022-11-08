import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import {UnauthorizedException, InternalServerErrorException} from '@nestjs/common'
import { AuthPayload } from './auth.payload';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
              private readonly configModule: ConfigService,
              private readonly jwtService: JwtService,
  ){}
  
  async  login(credentials:LoginDto){
    try {
      const user = await  this.userRepo.createQueryBuilder('user')
                                        .addSelect('user.password')
                                        .where('user.email = :email',{email:credentials.email})
                                        .getOne()
      if(!user) {
        throw new UnauthorizedException('Invalid Credentials')
      } 

      const isValid = await user.comparePassword(credentials.password, user.password)
      
      if (isValid){

        const token = this.jwtService.signAsync({
          id:user.id,
          email:user.email
        })

        delete user.password
        return {token, user}
          
      } else {
       throw new UnauthorizedException('Email or Password incorrect')
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }


  async register(credentials:RegisterUserDto){
    const { email } = credentials

    const existingUser = this.userRepo.findBy({email})

    if (existingUser){
      throw new BadRequestException('Email has already been taken.')
    } 
    const user = await this.userRepo.create(credentials)

    await this.userRepo.save(user)

    const payload = {id:user.id}

    const token = this.jwtService.signAsync(payload)

    return user
    
  }
   

//  async  signPayload(payload:any) {
//   returnasync  sign(payload,'secretkey',{expiresIn:'12h'})
//  }

//   async validateUser(payload: any) {
//     return await this.
//   }

  

}
