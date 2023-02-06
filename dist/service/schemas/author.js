"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    books: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "books",
    },
}, { versionKey: false, timestamps: true });
exports.Author = (0, mongoose_1.model)("author", authorSchema);
