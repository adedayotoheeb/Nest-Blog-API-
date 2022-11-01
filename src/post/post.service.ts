import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>){}
  
  async create(createPostDto: CreatePostDto) {  
    let post =  await this.postRepo.create(createPostDto)
    return this.postRepo.save(post)
  }

  async findAll():Promise<Post[]> {
    return await this.postRepo.find()
  }

  async findOne(id: number):Promise<Post>{
    let post = await this.postRepo.findOneById(id)
    if (post === null){
      throw new NotFoundException('No post with the given id exists')
    }
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.findOne(id)
    if (post === null){
      throw new NotFoundException('No post with the given id exists')
    }
    return await this.postRepo.update(id, updatePostDto)
  }

  async remove(id: number) {
    let post = await this.postRepo.findOneById(id);
        if (post === null) {
          throw new NotFoundException(`No user with the given Id  found`)
      }
      this.postRepo.delete(id);
  }
}
