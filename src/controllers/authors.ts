import { RequestHandler, Router } from "express";
import Controller from "../interfaces/controller.interface";
import service from "../service/authors";
import validate from "../middlewares/authorsValidation";
import AuthorNotFoundException from "../exceptions/AuthorNotFoundException";

class AuthorsController implements Controller {
	public path = "/authors";
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.get);
		this.router.get(`${this.path}/:id`, this.getOne);
		this.router.patch(`${this.path}/:id`, validate.updateAuthor, this.patch);
		this.router.delete(`${this.path}/:id`, this.deleteAuthor);
		this.router.post(this.path, validate.createAuthor, this.post);
	}

	private get: RequestHandler<{ page: number; limit: number }> = async (
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

	private getOne: RequestHandler<{ id: string }> = async (req, res, next) => {
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
	};

	private post: RequestHandler = async (req, res, next) => {
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

	private deleteAuthor: RequestHandler<{ id: string }> = async (
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
				next(new AuthorNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	};

	private patch: RequestHandler<{ id: string }> = async (req, res, next) => {
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
				next(new AuthorNotFoundException(req.params.id));
			}
		} catch (error) {
			next(error);
		}
	};
}

export default AuthorsController;
