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
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = require("../config/config");
const pool = mysql2_1.default
    .createPool({
    host: config_1.config.mysql.host,
    user: config_1.config.mysql.user,
    password: config_1.config.mysql.password,
    database: config_1.config.mysql.database,
})
    .promise();
function getAllBooks(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = (page - 1) * limit;
        const [result] = yield pool.query(`SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`);
        return result;
    });
}
function findBookByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM books WHERE title = ?`, [
            title,
        ]);
        if (result.length !== 0) {
            return result;
        }
    });
}
function getOneBook(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM books WHERE id = ?`, [
            bookId,
        ]);
        if (result.length !== 0) {
            return result;
        }
    });
}
function createBook(title, authors) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`INSERT INTO books (title, authors) VALUES (?,?)`, [title, authors]);
        const id = result.insertId;
        return getOneBook(id);
    });
}
function deleteBook(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`DELETE FROM books WHERE id = ?`, [bookId]);
        return result;
    });
}
function updateBook(bookId, title, authors) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`UPDATE books SET title = ?, authors = ? WHERE id = ?`, [title, authors, bookId]);
        return getOneBook(bookId);
    });
}
exports.default = {
    findBookByTitle,
    getAllBooks,
    getOneBook,
    createBook,
    deleteBook,
    updateBook,
};
