"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = __importDefault(require("./app"));
const authors_1 = __importDefault(require("./controllers/authors"));
const authors_books_1 = __importDefault(require("./controllers/authors_books"));
const books_1 = __importDefault(require("./controllers/books"));
exports.app = new app_1.default([
    new books_1.default(),
    new authors_1.default(),
    new authors_books_1.default(),
]);
exports.app.listen();
