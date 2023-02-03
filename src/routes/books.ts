import { Router } from "express";
import validation from "../middlewares/booksValidation";

const router = Router();
import bookController from "../controllers/books";

router.get("/", bookController.get);
router.get("/:id", bookController.getOne);
router.post("/", validation.createBook, bookController.post);
router.patch("/:id", validation.updateBook, bookController.patch);
router.delete("/:id", bookController.deleteBook);

export default router;
