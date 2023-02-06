import { Router } from "express";
const router = Router();
import validation from "../middlewares/authorsValidation";
import authorController from "../controllers/authors";

router.get("/", authorController.get);
router.get("/:id", authorController.getOne);
router.post("/", validation.createAuthor, authorController.post);
router.patch("/:id", validation.updateAuthor, authorController.patch);
router.delete("/:id", authorController.deleteAuthor);

export default router;
