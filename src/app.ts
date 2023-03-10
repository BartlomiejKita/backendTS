import express, { Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import { config } from "./config/config";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error";
import WrongRouteException from "./exceptions/WrongRouteException";
import BaseController from "./base-classes/base-controller";
 import { PromisePoolConnection } from "mysql2/promise";

class App {
	public app: express.Application;
	public readonly connection: PromisePoolConnection;

	constructor(controllers: BaseController[]) {
		this.connection = mysql
			.createPool({
				host: config.mysql.host,
				user: config.mysql.user,
				password: config.mysql.password,
				database: config.mysql.database,
			})
			.promise();
		this.app = express();
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(config.server.port, () => {
			console.log(`App listening on the port ${config.server.port}`);
		});
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(morgan("tiny"));
	}

	private initializeErrorHandling() {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			next(new WrongRouteException());
		});
		this.app.use(errorMiddleware);
	}

	private initializeControllers(controllers: BaseController[]) {
		controllers.forEach((controller) => {
			this.app.use("/", controller.router);
		});
	}
}

export default App;
