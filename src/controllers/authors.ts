import { RequestHandler } from "express";

import service from "../service/authors";

class AuthorsController {
	static get: RequestHandler<{ page: number; limit: number }> = async (
		req: any,
		res,
		next
	) => {
		const page = parseInt(req.query?.page || 1);
		const limit = parseInt(req.query?.limit || 20);
		try {
			const authors = await service.getAllAuthors(page, limit);
			res.json({
				status: "success",
				code: 200,
				data: authors,
			});
		} catch (error) {
			next(error);
		}
	};

	static getOne: RequestHandler<{ id: string }> = async (req, res, next) => {
		try {
			const author = await service.getOneAuthor(req.params.id);
			if (author) {
				res.json({
					status: "success",
					code: 200,
					data: author,
				});
			} else {
				res.json({
					status: "failure",
					code: 404,
					message: "Not found",
				});
			}
		} catch (error) {
			next(error);
		}
	};

	static post: RequestHandler = async (req, res, next) => {
		try {
			const author = await service.findAuthorByName(req.body.name);
			if (author) {
				return res.status(409).json({
					status: "conflict",
					code: 409,
					message: "Author with this name already exists",
				});
			}

			const newAuthor = await service.createAuthor(req.body);
			res.json({
				status: "success",
				code: 201,
				message: "New author has been added",
				data: newAuthor,
			});
		} catch (error) {
			next(error);
		}
	};

	static deleteAuthor: RequestHandler<{ id: string }> = async (
		req,
		res,
		next
	) => {
		try {
			const author = await service.deleteAuthor(req.params.id);
			if (author) {
				res.json({
					status: "success",
					code: 200,
					message: "Author has been removed",
				});
			} else {
				res.json({
					status: "failure",
					code: 404,
					message: "Not found",
				});
			}
		} catch (error) {
			next(error);
		}
	};

	static patch: RequestHandler<{ id: string }> = async (req, res, next) => {
		try {
			const author = await service.updateAuthor(req.params.id, req.body);
			if (author) {
				return res.json({
					status: "success",
					code: 200,
					message: "Author has been updated",
					data: author,
				});
			} else {
				return res.status(404).json({
					status: "failure",
					code: 404,
					message: "Not Found",
				});
			}
		} catch (error) {
			next(error);
		}
	};
}

export default AuthorsController;
