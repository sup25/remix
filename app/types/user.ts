import { Post } from "./post";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}
