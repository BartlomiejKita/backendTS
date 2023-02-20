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
function getAllAuthors(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = (page - 1) * limit;
        const [result] = yield pool.query(`SELECT * FROM authors LIMIT ${limit} OFFSET ${offset}`);
        return result;
    });
}
function findAuthorByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM authors WHERE author_name = ?`, [
            name,
        ]);
        if (result.length !== 0) {
            return result;
        }
    });
}
function getOneAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`SELECT * FROM authors WHERE author_id = ?`, [
            authorId,
        ]);
        if (result.length !== 0) {
            return result;
        }
    });
}
function createAuthor(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`INSERT INTO authors (author_name) VALUES (?)`, [name]);
        const id = result.insertId;
        return getOneAuthor(id);
    });
}
function deleteAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`DELETE FROM authors WHERE author_id = ?`, [
            authorId,
        ]);
        return result;
    });
}
function updateAuthor(authorId, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(`UPDATE authors SET author_name = IFNULL(?, author_name) WHERE author_id = ?`, [name, authorId]);
        return getOneAuthor(authorId);
    });
}
exports.default = {
    findAuthorByName,
    getAllAuthors,
    getOneAuthor,
    createAuthor,
    deleteAuthor,
    updateAuthor,
};
