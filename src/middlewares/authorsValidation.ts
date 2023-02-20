import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const schemaCreateAuthor = Joi.object({
	name: Joi.string().min(1).max(30).required(),
});

const schemaUpdateAuthor = Joi.object({
	name: Joi.string().min(1).max(30).optional(),
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
const createAuthor = (req: Request, res: Response, next: NextFunction) => {
	return validation(schemaCreateAuthor, req.body, next, res);
};

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
	return validation(schemaUpdateAuthor, req.body, next, res);
};

export default { createAuthor, updateAuthor };
