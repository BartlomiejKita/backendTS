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
const author_1 = require("./schemas/author");
const { Types: { ObjectId }, } = require("mongoose");
const findAuthorByName = (title) => __awaiter(void 0, void 0, void 0, function* () { return yield author_1.Author.findOne({ name }); });
const getAllAuthors = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return author_1.Author.find({})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit);
});
const getOneAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    let objectIdAuthorId;
    try {
        objectIdAuthorId = ObjectId(authorId);
    }
    catch (error) {
        return null;
    }
    return author_1.Author.findOne({ _id: objectIdAuthorId }).lean();
});
const createAuthor = (body) => __awaiter(void 0, void 0, void 0, function* () { return author_1.Author.create(body); });
const deleteAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    let objectIdAuthorId;
    try {
        objectIdAuthorId = ObjectId(authorId);
    }
    catch (error) {
        return null;
    }
    return author_1.Author.deleteOne({ _id: objectIdAuthorId });
});
const updateAuthor = (authorId, body) => __awaiter(void 0, void 0, void 0, function* () {
    let objectIdAuthorId;
    try {
        objectIdAuthorId = ObjectId(authorId);
    }
    catch (error) {
        return null;
    }
    return author_1.Author.findOneAndUpdate({
        _id: objectIdAuthorId,
    }, { $set: body }, {
        new: true,
        runValidators: true,
        strict: "throw",
    });
});
exports.default = {
    findAuthorByName,
    getAllAuthors,
    getOneAuthor,
    createAuthor,
    deleteAuthor,
    updateAuthor,
};
