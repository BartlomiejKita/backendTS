import express, { Request, Response, NextFunction, Handler } from "express";
import mysql from "mysql2";
import { config } from "./config/config";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error";
import WrongRouteException from "./exceptions/WrongRouteException";
import { PromisePoolConnection } from "mysql2/promise";
import "reflect-metadata";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";
import { controllers } from "./controllers";

class App {
	public app: express.Application;
	public readonly connection: PromisePoolConnection;

	constructor() {
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
		this.initializeControllers();
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

	private initializeControllers() {
		controllers.forEach((controllerClass) => {
			const controllerInstance: { [handleName: string]: Handler } =
				new controllerClass() as any;

			const basePath: string = Reflect.getMetadata(
				MetadataKeys.BASE_PATH,
				controllerClass
			);
			const routers: IRouter[] = Reflect.getMetadata(
				MetadataKeys.ROUTERS,
				controllerClass
			);

			const exRouter = express.Router();

			routers.forEach(({ method, path, handlerName }) => {
				exRouter[method](
					path,
					controllerInstance[String(handlerName)].bind(controllerInstance)
				);
			});

			this.app.use(basePath, exRouter);
		});
	}
}

export default App;
