"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemaCreateBook = joi_1.default.object({
    isbn: joi_1.default.string().min(10).max(13).required(),
    title: joi_1.default.string().min(1).max(120).required(),
    subtitle: joi_1.default.string().min(1).max(120).optional(),
    authors: joi_1.default.array().items(joi_1.default.string()).required(),
    pages: joi_1.default.number().min(1).max(2000).required(),
    description: joi_1.default.string().min(1).max(500),
});
const schemaUpdateBook = joi_1.default.object({
    isbn: joi_1.default.string().min(10).max(13).optional(),
    title: joi_1.default.string().min(1).max(120).optional(),
    subtitle: joi_1.default.string().min(1).max(120).optional(),
    authors: joi_1.default.string().min(1).max(120).optional(),
    pages: joi_1.default.number().min(1).max(2000).optional(),
    description: joi_1.default.string().min(1).max(500).optional(),
});
const validation = (schema, obj, next, res) => {
    const { error } = schema.validate(obj);
    if (error) {
        const [{ message }] = error.details;
        console.log(error);
        return res.json({
            status: "failure",
            code: 400,
            message: `Field ${message.replace(/"/g, "")}`,
        });
    }
    next();
};
const createBook = (req, res, next) => {
    return validation(schemaCreateBook, req.body, next, res);
};
const updateBook = (req, res, next) => {
    return validation(schemaUpdateBook, req.body, next, res);
};
exports.default = { createBook, updateBook };
