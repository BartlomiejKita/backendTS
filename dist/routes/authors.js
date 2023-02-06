"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authorsValidation_1 = __importDefault(require("../middlewares/authorsValidation"));
const authors_1 = __importDefault(require("../controllers/authors"));
router.get("/", authors_1.default.get);
router.get("/:id", authors_1.default.getOne);
router.post("/", authorsValidation_1.default.createAuthor, authors_1.default.post);
router.patch("/:id", authorsValidation_1.default.updateAuthor, authors_1.default.patch);
router.delete("/:id", authors_1.default.deleteAuthor);
exports.default = router;
