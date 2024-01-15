import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './posts.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private currentId = 1; // Initial ID value

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  create(postDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.currentId++, // Increment and assign ID
      title: postDto.title,
      content: postDto.content,
      createdAt: postDto.createdAt || new Date(),
    };

    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const updatedPost = { ...this.posts[postIndex], ...updatePostDto };
    this.posts[postIndex] = updatedPost;

    return updatedPost;
  }

  remove(id: number): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const removedPost = this.posts.splice(postIndex, 1)[0];

    return removedPost;
  }
}
