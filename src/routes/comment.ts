import { Router } from "express";
import CommentController from "../controllers/CommentController";
import { isAuthenticated } from "../middlewares/checkSession";
import { setTalentId } from "../middlewares/checkTalent";

const router = Router();

// get all comments by post id
router.get("/:id([0-9]+)", CommentController.listAllByPostId);

// create new comment given post id
router.post("/:id([0-9]+)", [isAuthenticated, setTalentId], CommentController.newComment);

export default router;
