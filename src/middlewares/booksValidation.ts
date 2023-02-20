import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const schemaCreateBook = Joi.object({
	book_title: Joi.string().min(1).max(120).required(),
	pages: Joi.string().required(),
	// authors: Joi.array().items(Joi.string()).required(),
});

const schemaUpdateBook = Joi.object({
	book_title: Joi.string().min(1).max(120).optional(),
	pages: Joi.string().required().optional(),
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
