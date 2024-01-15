import { Post } from '../posts.interface';

export class CreatePostDto implements Omit<Post, 'id'> {
  title: string;
  content: string;
  createdAt?: Date;
}
