import { RequestHandler } from "express";

import service from "../service/books";

class BooksController {
   
	static get: RequestHandler<{ page: number; limit: number }> = async (
		req: any,
		res,
		next
	) => {
		const page = parseInt(req.query?.page || 1);
		const limit = parseInt(req.query?.limit || 20);
		try {
			const books = await service.getAllBooks(page, limit);
			res.json({
				status: "success",
				code: 200,
				data: books,
			});
		} catch (error) {
			next(error);
		}
	};

	static getOne: RequestHandler<{ id: string }> = async (req, res, next) => {
		try {
			const book = await service.getOneBook(req.params.id);
			if (book) {
				res.json({
					status: "success",
					code: 200,
					data: book,
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
			const book = await service.findBookByTitle(req.body.title);
			if (book) {
				return res.status(409).json({
					status: "conflict",
					code: 409,
					message: "Book with this title already exists",
				});
			}

			const newBook = await service.createBook(req.body);
			res.json({
				status: "success",
				code: 201,
				message: "New book has been added",
				data: newBook,
			});
		} catch (error) {
			next(error);
		}
	};

	static deleteBook: RequestHandler<{ id: string }> = async (req, res, next) => {
		try {
			const book = await service.deleteBook(req.params.id);
			if (book) {
				res.json({
					status: "success",
					code: 200,
					message: "Book has been removed",
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
			const book = await service.updateBook(req.params.id, req.body);
			if (book) {
				return res.json({
					status: "success",
					code: 200,
					message: "Book has been updated",
					data: book,
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

export default BooksController;
