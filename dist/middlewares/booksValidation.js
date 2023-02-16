"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemaCreateBook = joi_1.default.object({
    title: joi_1.default.string().min(1).max(120).required(),
    authors: joi_1.default.string().required(),
    pages: joi_1.default.string().required(),
    // authors: Joi.array().items(Joi.string()).required(),
});
const schemaUpdateBook = joi_1.default.object({
    title: joi_1.default.string().min(1).max(120).optional(),
    authors: joi_1.default.string().min(1).max(120).optional(),
    pages: joi_1.default.string().required().optional(),
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
