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
const authors_1 = __importDefault(require("../service/authors"));
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    Number(page);
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
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
const post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield authors_1.default.findAuthorByName(req.body.name);
        if (author) {
            return res.status(409).json({
                status: "conflict",
                code: 409,
                message: "Author with this name already exists",
            });
        }
        const newAuthor = yield authors_1.default.createAuthor(req.body);
        res.json({
            status: "success",
            code: 201,
            message: "New author has been added",
            data: newAuthor,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield authors_1.default.deleteAuthor(req.params.id);
        if (author) {
            res.json({
                status: "success",
                code: 200,
                message: "Author has been removed",
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
const patch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield authors_1.default.updateAuthor(req.params.id, req.body);
        if (author) {
            return res.json({
                status: "success",
                code: 200,
                message: "Author has been updated",
                data: author,
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
exports.default = { get, getOne, post, deleteAuthor, patch };
