import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    PostModule,
    AuthModule,
    CategoryModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
   
  ],
 
  
})
export class AppModule {}
