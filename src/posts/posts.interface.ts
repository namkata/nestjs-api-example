export interface Post {
  id: number;
  content: string;
  title: string;
  createdAt?: Date; // Optional timestamp for post creation
}
