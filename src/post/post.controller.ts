import { Controller, UseGuards, Query , Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Exclude } from "class-transformer";
import { User } from 'src/auth/entities/user.entity';
import { SerializeInterceptors } from './interceptors/serialize.interceptor';
import { PostDto } from './dto/post.dto';
import { Request } from 'express';
import {  SortEnum } from './dto/sort.enum';
import { PostFilter } from './dto/post.filter';
import { AuthGuard } from '@nestjs/passport';


@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request  ) {
    return this.postService.create(createPostDto, req.user as User);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query()query:PostFilter) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
