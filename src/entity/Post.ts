import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Talent } from "./Talent";

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

    @ManyToOne(type => Talent, talent => talent.posts)
    talent: Talent;
}