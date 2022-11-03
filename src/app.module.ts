import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';


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
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
