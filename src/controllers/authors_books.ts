import { Response, Request, NextFunction, Router } from "express";
import service from "../service/authors_books";
import BookNotFoundException from "../exceptions/BookNotFoundException";
import Controller from "../utils/controller.decorator";
import { Get, Post, Patch, Delete } from "../utils/handlers.decorator";
@Controller("/authors_books")
class AuthorsBooksController {
	@Get("/:id")
	protected async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await service.getBookWithAuthors(req.params.id);
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
			const relation = await service.relateAuthorsBooks(
				req.body.author_id,
				req.body.book_id
			);
			res.json({
				status: "success",
				code: 201,
				message: "New relation has been created",
				data: relation,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorsBooksController;
