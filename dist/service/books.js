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
const book_1 = require("./schemas/book");
const { Types: { ObjectId }, } = require("mongoose");
const findBookByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () { return yield book_1.Book.findOne({ title }); });
const getAllBooks = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return book_1.Book.find({})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit);
});
const getOneBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    let objectIdBookId;
    try {
        objectIdBookId = ObjectId(bookId);
    }
    catch (error) {
        return null;
    }
    return book_1.Book.findOne({ _id: objectIdBookId }).lean();
});
const createBook = (body) => __awaiter(void 0, void 0, void 0, function* () { return book_1.Book.create(body); });
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    let objectIdBookId;
    try {
        objectIdBookId = ObjectId(bookId);
    }
    catch (error) {
        return null;
    }
    return book_1.Book.deleteOne({ _id: objectIdBookId });
});
const updateBook = (bookId, body) => __awaiter(void 0, void 0, void 0, function* () {
    let objectIdBookId;
    try {
        objectIdBookId = ObjectId(bookId);
    }
    catch (error) {
        return null;
    }
    return book_1.Book.findOneAndUpdate({
        _id: objectIdBookId,
    }, { $set: body }, {
        new: true,
        runValidators: true,
        strict: "throw",
    });
});
exports.default = {
    findBookByTitle,
    getAllBooks,
    getOneBook,
    createBook,
    deleteBook,
    updateBook,
};
