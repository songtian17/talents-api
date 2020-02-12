import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

// get all posts
router.get("/", PostController.listAll);

// get one post
router.get("/:id([0-9]+)", PostController.getOneById);

// create new post
router.post("/", PostController.newPost);

// delete one post
router.delete("/:id([0-9]+)", PostController.deletePost);

export default router;
