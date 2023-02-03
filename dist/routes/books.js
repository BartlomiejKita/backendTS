"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booksValidation_1 = __importDefault(require("../middlewares/booksValidation"));
const router = (0, express_1.Router)();
const books_1 = __importDefault(require("../controllers/books"));
router.get("/", books_1.default.get);
router.get("/:id", books_1.default.getOne);
router.post("/", booksValidation_1.default.createBook, books_1.default.post);
router.patch("/:id", booksValidation_1.default.updateBook, books_1.default.patch);
router.delete("/:id", books_1.default.deleteBook);
exports.default = router;
