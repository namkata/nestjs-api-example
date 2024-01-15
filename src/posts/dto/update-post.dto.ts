import { Post } from '../posts.interface';

export class UpdatePostDto implements Partial<Post> {
  title?: string;
  content?: string;
}
