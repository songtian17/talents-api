import { Router } from "express";
import PostController from "../controllers/PostController";
import { isAuthenticated } from "../middlewares/checkSession";
import { setTalentId } from "../middlewares/checkTalent";

const router = Router();

// get all posts
router.get("/", PostController.listAll);

// get one post
router.get("/:id([0-9]+)", PostController.getOneById);

// create new post
router.post("/", [isAuthenticated, setTalentId], PostController.newPost);

// update one post
router.put("/:id([0-9]+)", [isAuthenticated, setTalentId], PostController.updatePost);

// delete one post
router.delete("/:id([0-9]+)", [isAuthenticated, setTalentId], PostController.deletePost);

export default router;
