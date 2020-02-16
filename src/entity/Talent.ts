import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique
} from "typeorm";
import { Post } from "./Post";

@Entity()
@Unique("UNIQUE_USERNAME", ["username"])
export class Talent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  profileImageUri: string;

  @Column()
  bio: string;

  @Column()
  isSubscribed: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => Post,
    post => post.talent
  )
  posts: Post[];
}
