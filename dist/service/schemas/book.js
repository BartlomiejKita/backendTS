"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    isbn: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13,
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 120,
    },
    subtitle: {
        type: String,
        minlength: 1,
        maxlength: 120,
    },
    author: {
        type: String,
        minlength: 1,
        maxlength: 90,
    },
    pages: {
        type: Number,
        min: 1,
        max: 2000,
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 500,
    },
}, { versionKey: false, timestamps: true });
exports.Book = (0, mongoose_1.model)("book", bookSchema);
