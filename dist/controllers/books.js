"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = require("../service/schemas/book");
const books_1 = __importDefault(require("../service/books"));
class BooksController {
    constructor() {
        this.path = "/books";
        this.router = (0, express_1.Router)();
        this.book = book_1.Book;
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const page = parseInt(((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1);
            const limit = parseInt(((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20);
            try {
                const books = yield books_1.default.getAllBooks(page, limit);
                res.json({
                    status: "success",
                    code: 200,
                    data: books,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.getOneBook(req.params.id);
                if (book) {
                    res.json({
                        status: "success",
                        code: 200,
                        data: book,
                    });
                }
                else {
                    res.json({
                        status: "failure",
                        code: 404,
                        message: "Not found",
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.post = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.findBookByTitle(req.body.title);
                if (book) {
                    return res.status(409).json({
                        status: "conflict",
                        code: 409,
                        message: "Book with this title already exists",
                    });
                }
                const newBook = yield books_1.default.createBook(req.body);
                res.json({
                    status: "success",
                    code: 201,
                    message: "New book has been added",
                    data: newBook,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteBook = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.deleteBook(req.params.id);
                if (book) {
                    res.json({
                        status: "success",
                        code: 200,
                        message: "Book has been removed",
                    });
                }
                else {
                    res.json({
                        status: "failure",
                        code: 404,
                        message: "Not found",
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.patch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.updateBook(req.params.id, req.body);
                if (book) {
                    return res.json({
                        status: "success",
                        code: 200,
                        message: "Book has been updated",
                        data: book,
                    });
                }
                else {
                    return res.status(404).json({
                        status: "failure",
                        code: 404,
                        message: "Not Found",
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.get);
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.patch(`${this.path}/:id`, this.patch);
        this.router.delete(`${this.path}/:id`, this.deleteBook);
        this.router.post(this.path, this.post);
    }
}
exports.default = BooksController;
