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
const books_1 = __importDefault(require("../service/books"));
const booksValidation_1 = __importDefault(require("../middlewares/booksValidation"));
const BookNotFoundException_1 = __importDefault(require("../exceptions/BookNotFoundException"));
const base_controller_1 = __importDefault(require("../base-classes/base-controller"));
class BooksController extends base_controller_1.default {
    constructor() {
        super();
        this.path = "/books";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.get);
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.patch(`${this.path}/:id`, booksValidation_1.default.updateBook, this.patch);
        this.router.delete(`${this.path}/:id`, this.deleteBook);
        this.router.post(this.path, booksValidation_1.default.createBook, this.post);
    }
    get(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1);
            const limit = parseInt(((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 10);
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
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    next(new BookNotFoundException_1.default(req.params.id));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.findBookByTitle(req.body.title);
                if (book) {
                    res.status(409).json({
                        status: "conflict",
                        code: 409,
                        message: "Book with this title already exists",
                    });
                }
                else {
                    const newBook = yield books_1.default.createBook(req.body.title, req.body.authors);
                    res.json({
                        status: "success",
                        code: 201,
                        message: "New book has been added",
                        data: newBook,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.getOneBook(req.params.id);
                if (book) {
                    yield books_1.default.deleteBook(req.params.id);
                    res.json({
                        status: "success",
                        code: 200,
                        message: "Book has been removed",
                    });
                }
                else {
                    next(new BookNotFoundException_1.default(req.params.id));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    patch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield books_1.default.getOneBook(req.params.id);
                if (book) {
                    const newBook = yield books_1.default.updateBook(req.params.id, req.body.title, req.body.authors);
                    res.json({
                        status: "success",
                        code: 200,
                        message: "Book has been updated",
                        data: newBook,
                    });
                }
                else {
                    next(new BookNotFoundException_1.default(req.params.id));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = BooksController;
