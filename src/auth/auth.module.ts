import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports:[TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt'}),
  JwtModule.registerAsync({
    useFactory: () => ({
      secret:process.env.JWT_SECRET,
      signOptions:{
        // algorithms:process.env.ALGORITHM_TYPE,
        expiresIn:process.env.EXPIRING_PERIOD,
    },
    }
  )})
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})

export class AuthModule {}
