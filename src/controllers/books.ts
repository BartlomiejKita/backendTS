import { Response, Request, NextFunction, Router } from "express";
import service from "../service/books";
import validate from "../middlewares/booksValidation";
import BookNotFoundException from "../exceptions/BookNotFoundException";

import Controller from "../utils/controller.decorator";
import { Get, Post, Patch, Delete } from "../utils/handlers.decorator";

@Controller("/books")
class BooksController {
	@Get("")
	protected async get(req: any, res: Response, next: NextFunction) {
		const page = parseInt(req.query?.page || 1);
		const limit = parseInt(req.query?.limit || 10);
		const gt = req.query?.gt || "1000-01-01";
		const lt = req.query?.lt || "3000-01-01";
		try {
			const books = await service.getAllBooks(page, limit, gt, lt);
			res.json({
				status: "success",
				code: 200,
				data: books,
			});
		} catch (error) {
			next(error);
		}
	}
	@Get("/:id")
	protected async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.getOneBook(req.params.id);
			if (book) {
				res.json({
					status: "success",
					code: 200,
					data: book,
				});
			} else {
				next(new BookNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	}
	@Post("")
	protected async post(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.findBookByTitle(req.body.book_title);
			if (book) {
				res.status(409).json({
					status: "conflict",
					code: 409,
					message: "Book with this title already exists",
				});
			} else {
				const newBook = await service.createBook(
					req.body.book_title,
					req.body.pages,
					req.body.publish_date
				);
				res.json({
					status: "success",
					code: 201,
					message: "New book has been added",
					data: newBook,
				});
			}
		} catch (error) {
			next(error);
		}
	}
	@Delete("/:id")
	protected async deleteBook(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.getOneBook(req.params.id);
			if (book) {
				await service.deleteBook(req.params.id);
				res.json({
					status: "success",
					code: 200,
					message: "Book has been removed",
				});
			} else {
				next(new BookNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	}
	@Patch("/:id")
	protected async patch(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.getOneBook(req.params.id);
			if (book) {
				const newBook = await service.updateBook(
					req.params.id,
					req.body.book_title,
					req.body.pages,
					req.body.publish_date
				);
				res.json({
					status: "success",
					code: 200,
					message: "Book has been updated",
					data: newBook,
				});
			} else {
				next(new BookNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	}
}

export default BooksController;
