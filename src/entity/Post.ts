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

export enum Visibility {
  PRIVATE = "private",
  PUBLIC = "public"
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUri: string;

  @Column()
  talentId: number;

  @Column({
    type: "enum",
    enum: Visibility,
    default: Visibility.PUBLIC
  })
  visibility: Visibility;

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
