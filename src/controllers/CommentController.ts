import { Comment } from "../entity/Comment";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class CommentController {
  static listAllByPostId = async (req: Request, res: Response) => {
    let comments: Comment[];
    let postId: number = Number(req.params.id);

    const commentRepository = getRepository(Comment);
    comments = await commentRepository.find({
      where: { postId: postId },
      relations: ["author"],
      order: {
        createdAt: "DESC"
      }
    });
    res.send(comments);
  };

  static newComment = async (req: Request, res: Response) => {
    let postId: number = Number(req.params.id);
    let { content, authorId } = req.body;
    const commentRepository = getRepository("Comment");

    let comment = new Comment();
    comment.content = content;
    comment.authorId = authorId;
    comment.postId = postId;

    try {
      await commentRepository.save(comment);
    } catch (err) {
      res.status(500).send(err);
    }

    res.status(201).send("Comment created");
  };
}

export default CommentController;
