"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const books_1 = __importDefault(require("../controllers/books"));
router.get("/", books_1.default.get);
router.get("/:id", books_1.default.getOne);
router.post("/", books_1.default.post);
router.put("/:id", books_1.default.put);
router.delete("/:id", books_1.default.deleteBook);
exports.default = router;
