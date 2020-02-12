import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Talent } from "./Talent";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @Column()
  postId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Talent)
  author: Talent;

  @ManyToOne(
    type => Post,
    post => post.comments
  )
  post: Post;
}
