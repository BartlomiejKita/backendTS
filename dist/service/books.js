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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
function getAllBooks(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = (page - 1) * limit;
        const [result] = yield server_1.app.connection.query(`SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`);
        return result;
    });
}
function findBookByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield server_1.app.connection.query(`SELECT * FROM books WHERE book_title = ?`, [title]);
        if (result.length !== 0) {
            return result;
        }
    });
}
function getOneBook(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield server_1.app.connection.query(`SELECT * FROM books WHERE book_id = ?`, [bookId]);
        if (result.length !== 0) {
            return result;
        }
    });
}
function createBook(title, authors, pages) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield server_1.app.connection.query(`INSERT INTO books (book_title, authors, pages) VALUES (?,?,?)`, [title, authors, pages]);
        const id = result.insertId;
        return getOneBook(id);
    });
}
function deleteBook(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield server_1.app.connection.query(`DELETE FROM books WHERE book_id = ?`, [bookId]);
        return result;
    });
}
function updateBook(bookId, title, authors, pages) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield server_1.app.connection.query(`UPDATE books SET book_title = IFNULL(?, book_title), authors = IFNULL(?, authors), pages = IFNULL(?, pages) WHERE book_id = ?`, [title, authors, pages, bookId]);
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
