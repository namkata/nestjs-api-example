import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './posts.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import PostEntity from './posts.entity';
import Post from './posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id: id });
  }

  async create(postData: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(postData);
    return this.postRepository.save(newPost);
  }

  async update(id: number, updateData: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: id });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    // Update the post entity with the new data
    this.postRepository.merge(post, updateData);

    // Save the updated post entity to the database
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
  // findAll(): Post[] {
  //   return this.posts;
  // }

  // findOne(id: number): Post {
  //   const post = this.posts.find((p) => p.id === id);

  //   if (!post) {
  //     throw new NotFoundException(`Post with id ${id} not found`);
  //   }

  //   return post;
  // }

  // create(postDto: CreatePostDto): Post {
  //   const newPost: Post = {
  //     id: this.currentId++, // Increment and assign ID
  //     title: postDto.title,
  //     content: postDto.content,
  //     createdAt: postDto.createdAt || new Date(),
  //   };

  //   this.posts.push(newPost);
  //   return newPost;
  // }

  // update(id: number, updatePostDto: UpdatePostDto): Post {
  //   const postIndex = this.posts.findIndex((post) => post.id === id);

  //   if (postIndex === -1) {
  //     throw new NotFoundException(`Post with id ${id} not found`);
  //   }

  //   const updatedPost = { ...this.posts[postIndex], ...updatePostDto };
  //   this.posts[postIndex] = updatedPost;

  //   return updatedPost;
  // }

  // remove(id: number): Post {
  //   const postIndex = this.posts.findIndex((post) => post.id === id);

  //   if (postIndex === -1) {
  //     throw new NotFoundException(`Post with id ${id} not found`);
  //   }

  //   const removedPost = this.posts.splice(postIndex, 1)[0];

  //   return removedPost;
  // }
}
