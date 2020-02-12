import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Post } from "../entity/Post";

class PostController {
  static listAll = async (req: Request, res: Response) => {
    let posts: Post[];
    let user: string = req.query.user;
    const limit: number = req.query.limit ? req.query.limit : 25;
    const page: number = req.query.page ? req.query.page : 1;

    const postRepository = getRepository(Post);
    if (req.query.user) {
      posts = await postRepository
        .createQueryBuilder("post")
        .where("post.talentId = :id", { id: user })
        .leftJoinAndSelect("post.comments", "comments")
        .leftJoinAndSelect("post.talent", "talent")
        .leftJoinAndSelect("comments.author", "author")
        .orderBy("post.createdAt", "DESC")
        .addOrderBy("comments.createdAt", "DESC")
        .take(limit)
        .skip(limit * (page - 1))
        .getMany();
      res.send(posts);
      return;
    }

    posts = await postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.comments", "comments")
      .leftJoinAndSelect("post.talent", "talent")
      .leftJoinAndSelect("comments.author", "author")
      .take(limit)
      .skip(limit * (page - 1))
      .getMany();
    res.send(posts);
  };

  static getOneById = async (req: Request, res: Response) => {
    // get id from url
    const id: number = Number(req.params.id);

    // get post from db
    const postRepository = getRepository(Post);
    try {
      const post = await postRepository
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.comments", "comments")
        .leftJoinAndSelect("post.talent", "talent")
        .leftJoinAndSelect("comments.author", "author")
        .getOne();
      res.send(post);
    } catch (err) {
      res.status(404).send("Talent not found");
    }
  };

  static newPost = async (req: Request, res: Response) => {
    // get params from body
    let { imageUri, talentId } = req.body;
    let post = new Post();
    post.imageUri = imageUri;
    post.talentId = talentId;

    const postRepository = getRepository(Post);
    try {
      await postRepository.save(post);
    } catch (err) {
      res.status(500).send(err);
    }

    res.status(201).send("Post created");
  };

  static deletePost = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const postRepository = getRepository(Post);
    let post: Post;

    try {
      post = await postRepository.findOneOrFail(id);
    } catch (err) {
      res.status(404).send("Post not found");
    }
    postRepository.delete(id);

    res.status(200).send("Post deleted");
  };
}

export default PostController;
