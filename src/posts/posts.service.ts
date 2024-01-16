import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './posts.entity';
import { Repository } from 'typeorm';
import PostNotFoundException from './exceptions/postNotFound.exception';
import User from './../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['categories', 'author'],
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: ['categories', 'author'],
    });
  }

  async create(postData: CreatePostDto, user: User): Promise<Post> {
    const newPost = this.postRepository.create({
      ...postData,
      author: user,
    });
    return this.postRepository.save(newPost);
  }

  async update(id: number, updateData: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: ['categories', 'author'],
    });

    if (!post) {
      throw new PostNotFoundException(id);
    }

    // Update the post entity with the new data
    this.postRepository.merge(post, updateData);

    // Save the updated post entity to the database
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
