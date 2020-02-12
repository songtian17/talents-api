import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Talent } from "./Talent";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUri: string;

  @Column()
  talentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    type => Talent,
    talent => talent.posts
  )
  talent: Talent;

  @OneToMany(
    type => Comment,
    comment => comment.post
  )
  comments: Comment[];
}
