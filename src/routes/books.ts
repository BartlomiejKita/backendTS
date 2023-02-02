import { Router } from "express";

const router = Router();
import bookController from "../controllers/books";

router.get("/", bookController.get);
router.get("/:id", bookController.getOne);
router.post("/", bookController.post);
router.put("/:id", bookController.put);
router.delete("/:id", bookController.deleteBook);

export default router;
