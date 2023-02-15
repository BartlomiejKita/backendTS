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
const authors_1 = __importDefault(require("../service/authors"));
const authorsValidation_1 = __importDefault(require("../middlewares/authorsValidation"));
const AuthorNotFoundException_1 = __importDefault(require("../exceptions/AuthorNotFoundException"));
const base_controller_1 = __importDefault(require("../base-classes/base-controller"));
class AuthorsController extends base_controller_1.default {
    constructor() {
        super();
        this.path = "/authors";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.get);
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.patch(`${this.path}/:id`, authorsValidation_1.default.updateAuthor, this.patch);
        this.router.delete(`${this.path}/:id`, this.deleteAuthor);
        this.router.post(this.path, authorsValidation_1.default.createAuthor, this.post);
    }
    get(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1);
            const limit = parseInt(((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 20);
            try {
                const authors = yield authors_1.default.getAllAuthors(page, limit);
                res.json({
                    status: "success",
                    code: 200,
                    data: authors,
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
                const author = yield authors_1.default.getOneAuthor(req.params.id);
                if (author) {
                    res.json({
                        status: "success",
                        code: 200,
                        data: author,
                    });
                }
                else {
                    next(new AuthorNotFoundException_1.default(req.params.id));
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
                const author = yield authors_1.default.findAuthorByName(req.body.name);
                if (author) {
                    res.status(409).json({
                        status: "conflict",
                        code: 409,
                        message: "Author with this name already exists",
                    });
                }
                else {
                    const newAuthor = yield authors_1.default.createAuthor(req.body.name, req.body.books);
                    res.json({
                        status: "success",
                        code: 201,
                        message: "New author has been added",
                        data: newAuthor,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAuthor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield authors_1.default.getOneAuthor(req.params.id);
                if (author) {
                    yield authors_1.default.deleteAuthor(req.params.id);
                    res.json({
                        status: "success",
                        code: 200,
                        message: "Author has been removed",
                    });
                }
                else {
                    next(new AuthorNotFoundException_1.default(req.params.id));
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
                const author = yield authors_1.default.getOneAuthor(req.params.id);
                if (author) {
                    const newAuthor = yield authors_1.default.updateAuthor(req.params.id, req.body.name, req.body.books);
                    res.json({
                        status: "success",
                        code: 200,
                        message: "Author has been updated",
                        data: newAuthor,
                    });
                }
                else {
                    next(new AuthorNotFoundException_1.default(req.params.id));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthorsController;
