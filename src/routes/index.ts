import { Router } from "express";
const router = Router();
import authors from "./authors";
import books from "./books";

router.use("/books", books);
router.use("/authors", authors);

export default router;
