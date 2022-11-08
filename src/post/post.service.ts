import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { SortEnum } from './dto/sort.enum';
import { PostFilter } from './dto/post.filter';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>){}
  
  async create(createPostDto: CreatePostDto, user: User) {  
    let post =  await this.postRepo.create(createPostDto)
    return this.postRepo.save(post)
  }

  async findAll(query?:PostFilter){
    
    const myQuery = this.postRepo.createQueryBuilder('post')
                                 .leftJoinAndSelect('post.category','category')
                                 .leftJoinAndSelect('post.user', 'user')
    
    if (!(Object.keys(query).length === 0) && query.constructor === Object ) {
      const queryKeys = Object.keys(query)

      if(queryKeys.includes('title')){
        myQuery.where('post.title LIKE :title', {title:`%${query.title}%`})
      }

      // if(queryKeys.includes('sort')){
      //   myQuery.orderBy('post.title', query.sort.)
      // }

      if(queryKeys.includes('category')){
        myQuery.andWhere('category.title = :cat', {cat: query.category})
      }
         
      return await myQuery.getMany()

    } else{
      return await myQuery.getMany()
    }
    
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
    post.modifiedOn = new Date(Date.now())
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
