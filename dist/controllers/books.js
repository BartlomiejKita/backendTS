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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = __importDefault(require("../service/books"));
class BooksController {
}
_a = BooksController;
BooksController.get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const page = parseInt(((_b = req.query) === null || _b === void 0 ? void 0 : _b.page) || 1);
    const limit = parseInt(((_c = req.query) === null || _c === void 0 ? void 0 : _c.limit) || 20);
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
BooksController.getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
BooksController.post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
BooksController.deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
BooksController.patch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = BooksController;
