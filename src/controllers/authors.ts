import { Response, Request, NextFunction, Router } from "express";
import service from "../service/authors";
import validate from "../middlewares/authorsValidation";
import AuthorNotFoundException from "../exceptions/AuthorNotFoundException";
import Controller from "../utils/controller.decorator";
import { Get, Post, Patch, Delete } from "../utils/handlers.decorator";
@Controller("/authors")
class AuthorsController {
	@Get("")
	protected async get(req: any, res: Response, next: NextFunction) {
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
	}
	@Get("/:id")
	protected async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await service.getOneAuthor(req.params.id);
			if (author) {
				res.json({
					status: "success",
					code: 200,
					data: author,
				});
			} else {
				next(new AuthorNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	}
	@Post("")
	protected async post(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await service.findAuthorByName(req.body.name);
			if (author) {
				res.status(409).json({
					status: "conflict",
					code: 409,
					message: "Author with this name already exists",
				});
			} else {
				const newAuthor = await service.createAuthor(
					req.body.name,
					req.body.birth_date
				);
				res.json({
					status: "success",
					code: 201,
					message: "New author has been added",
					data: newAuthor,
				});
			}
		} catch (error) {
			next(error);
		}
	}
	@Delete("/:id")
	protected async deleteAuthor(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const author = await service.getOneAuthor(req.params.id);
			if (author) {
				await service.deleteAuthor(req.params.id);
				res.json({
					status: "success",
					code: 200,
					message: "Author has been removed",
				});
			} else {
				next(new AuthorNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	}
	@Patch("/:id")
	protected async patch(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await service.getOneAuthor(req.params.id);
			if (author) {
				const newAuthor = await service.updateAuthor(
					req.params.id,
					req.body.name,
					req.body.birth_date
				);
				res.json({
					status: "success",
					code: 200,
					message: "Author has been updated",
					data: newAuthor,
				});
			} else {
				next(new AuthorNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorsController;
