"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schemaCreateContact = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pl"] },
    })
        .required(),
    phone: joi_1.default.string()
        .pattern(/^(\+48\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{3}$/)
        .required(),
    favorite: joi_1.default.boolean().optional(),
});
const schemaUpdateContact = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pl"] },
    })
        .required(),
    phone: joi_1.default.string()
        .pattern(/^(\+48\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{3}$/)
        .required(),
    favorite: joi_1.default.boolean().optional(),
});
const schemaUpdateStatusContact = joi_1.default.object({
    favorite: joi_1.default.boolean().required(),
});
const validate = (schema, obj, next, res) => {
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
module.exports.createContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next, res);
};
module.exports.updateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next, res);
};
module.exports.updateStatusContact = (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next, res);
};
