import { Response, Request, NextFunction, Router } from "express";
import NotImplementedError from "../exceptions/NotImplemented";
import Controller from "../interfaces/controller.interface";

class BaseController implements Controller {
	public path = "";
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	protected initializeRoutes() {
		this.router.get(this.path, this.get);
		this.router.get(`${this.path}/:id`, this.getOne);
		this.router.patch(`${this.path}/:id`, this.patch);
		this.router.delete(`${this.path}/:id`, this.delete);
		this.router.post(this.path, this.post);
	}

	protected async get(req: any, res: Response, next: NextFunction) {
		throw new NotImplementedError();
	}

	protected async getOne(req: Request, res: Response, next: NextFunction) {
		throw new NotImplementedError();
	}

	protected async post(req: Request, res: Response, next: NextFunction) {
		throw new NotImplementedError();
	}

	protected async delete(req: Request, res: Response, next: NextFunction) {
		throw new NotImplementedError();
	}

	protected async patch(req: Request, res: Response, next: NextFunction) {
		throw new NotImplementedError();
	}
}

export default BaseController;
