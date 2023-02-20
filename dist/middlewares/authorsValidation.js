"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemaCreateAuthor = joi_1.default.object({
    name: joi_1.default.string().min(1).max(30).required(),
});
const schemaUpdateAuthor = joi_1.default.object({
    name: joi_1.default.string().min(1).max(30).optional(),
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
const createAuthor = (req, res, next) => {
    return validation(schemaCreateAuthor, req.body, next, res);
};
const updateAuthor = (req, res, next) => {
    return validation(schemaUpdateAuthor, req.body, next, res);
};
exports.default = { createAuthor, updateAuthor };
