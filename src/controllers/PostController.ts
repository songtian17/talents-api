import { Request, Response } from "express";
import { getRepository, Any } from "typeorm";

import { Post, Visibility } from "../entity/Post";

class PostController {
  static listAll = async (req: Request, res: Response) => {
    let posts: Post[];
    let user: number = Number(req.query.user);
    const authenticatedTalentId = res.locals.talentId;
    const limit: number = req.query.limit ? req.query.limit : 25;
    const page: number = req.query.page ? req.query.page : 1;

    const postRepository = getRepository(Post);
    if (req.query.user) {
      if (authenticatedTalentId === user) {
        console.log("isUser");
        posts = await postRepository
          .createQueryBuilder("Post")
          .where("post.talentId = :id", { id: user })
          .leftJoinAndSelect("post.comments", "comments")
          .leftJoinAndSelect("post.talent", "talent")
          .leftJoinAndSelect("comments.author", "author")
          .orderBy("post.createdAt", "DESC")
          .take(limit)
          .skip(limit * (page - 1))
          .getMany();
        console.log("No. of posts", posts.length);
        res.send(posts);
        return;
      }
      posts = await postRepository
        .createQueryBuilder("Post")
        .where("post.talentId = :id", { id: user })
        .where("post.visibility = :visibility", {
          visibility: Visibility.PUBLIC
        })
        .leftJoinAndSelect("post.comments", "comments")
        .leftJoinAndSelect("post.talent", "talent")
        .leftJoinAndSelect("comments.author", "author")
        .orderBy("post.createdAt", "DESC")
        .take(limit)
        .skip(limit * (page - 1))
        .getMany();
      res.send(posts);
      return;
    }

    posts = await postRepository
      .createQueryBuilder("post")
      .where("post.visibility = :visibility", { visibility: Visibility.PUBLIC })
      .leftJoinAndSelect("post.comments", "comments")
      .leftJoinAndSelect("post.talent", "talent")
      .leftJoinAndSelect("comments.author", "author")
      .orderBy("post.createdAt", "DESC")
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
      res.status(404).send("Post not found");
    }
  };

  static newPost = async (req: Request, res: Response) => {
    // get params from body
    let { imageUri, talentId, visibility } = req.body;
    const authenticatedTalentId = res.locals.talentId;
    if (authenticatedTalentId != talentId) {
      return res.sendStatus(403);
    }
    let post = new Post();
    post.imageUri = imageUri;
    post.talentId = talentId;
    post.visibility = visibility ? visibility : Visibility.PUBLIC;

    const postRepository = getRepository(Post);
    try {
      await postRepository.save(post);
    } catch (err) {
      res.status(500).send(err);
    }

    res.status(201).send("Post created");
  };

  static updatePost = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    let { visibility } = req.body;
    const authenticatedTalentId = res.locals.talentId;
    const postRepository = getRepository(Post);
    let post: Post;

    try {
      post = await postRepository.findOneOrFail(id);
      if (post.talentId != authenticatedTalentId) {
        return res.sendStatus(403);
      }
    } catch (err) {
      return res.status(404).send("Post not found");
    }

    post.visibility = visibility;

    try {
      await postRepository.save(post);
    } catch (err) {
      return res.status(500).send(err);
    }

    res.status(200).send("Post updated");
  };

  static deletePost = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const authenticatedTalentId = res.locals.talentId;
    const postRepository = getRepository(Post);
    let post: Post;

    try {
      post = await postRepository.findOneOrFail(id);
    } catch (err) {
      res.status(404).send("Post not found");
    }
    if (post.talentId != authenticatedTalentId) {
      return res.sendStatus(403);
    }
    postRepository.delete(post);

    res.status(200).send("Post deleted");
  };
}

export default PostController;
