import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const schemaCreateBook = Joi.object({
	isbn: Joi.string().min(10).max(13).required(),
	title: Joi.string().min(1).max(120).required(),
	subtitle: Joi.string().min(1).max(120).optional(),
	authors:  Joi.array().items(Joi.string()).required(),
	pages: Joi.number().min(1).max(2000).required(),
	description: Joi.string().min(1).max(500),
});

const schemaUpdateBook = Joi.object({
	isbn: Joi.string().min(10).max(13).optional(),
	title: Joi.string().min(1).max(120).optional(),
	subtitle: Joi.string().min(1).max(120).optional(),
	authors: Joi.string().min(1).max(120).optional(),
	pages: Joi.number().min(1).max(2000).optional(),
	description: Joi.string().min(1).max(500).optional(),
});

const validation = (
	schema: Joi.Schema,
	obj: object,
	next: NextFunction,
	res: Response
) => {
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
const createBook = (req: Request, res: Response, next: NextFunction) => {
	return validation(schemaCreateBook, req.body, next, res);
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
	return validation(schemaUpdateBook, req.body, next, res);
};

export default { createBook, updateBook };
