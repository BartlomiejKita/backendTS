import { Response, Request, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import service from "../service/books";
import validate from "../middlewares/booksValidation";
import BookNotFoundException from "../exceptions/BookNotFoundException";
import BaseController from "../base-classes/base-controller";

class BooksController extends BaseController {
	public path = "/books";
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	protected initializeRoutes() {
		this.router.get(this.path, this.get);
		this.router.get(`${this.path}/:id`, this.getOne);
		this.router.patch(`${this.path}/:id`, validate.updateBook, this.patch);
		this.router.delete(`${this.path}/:id`, this.deleteBook);
		this.router.post(this.path, validate.createBook, this.post);
	}

	protected async get(req: any, res: Response, next: NextFunction) {
		const page = parseInt(req.query?.page || 1);
		const limit = parseInt(req.query?.limit || 10);
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
	}

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

	protected async post(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.findBookByTitle(req.body.title);
			if (book) {
				res.status(409).json({
					status: "conflict",
					code: 409,
					message: "Book with this title already exists",
				});
			} else {
				const newBook = await service.createBook(
					req.body.title,
					req.body.authors
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

	protected async patch(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.getOneBook(req.params.id);
			if (book) {
				const newBook = await service.updateBook(
					req.params.id,
					req.body.title,
					req.body.authors
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
