import { Router } from "express";
import TalentController from "../controllers/TalentController";
import { isAuthenticated } from "../middlewares/checkSession";
import { setTalentId } from "../middlewares/checkTalent";

const router = Router();

// get all talents
router.get("/", TalentController.listAll);

// get list of talents through search
router.get('/search', TalentController.searchAll)

// get one talent by username
router.get("/username/:username", TalentController.getOneByUsername);

// get one talent
router.get("/:id([0-9]+)", TalentController.getOneById);

// create new talent
router.post("/", TalentController.newTalent);

// update one talent
router.put("/:id([0-9]+)", [isAuthenticated, setTalentId], TalentController.editTalent);

// delete one talent
router.delete("/:id([0-9]+)", TalentController.deleteTalent);

export default router;
