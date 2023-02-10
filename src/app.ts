import express, { Request, Response, NextFunction } from "express";
import Controller from "./interfaces/controller.interface";
import mongoose from "mongoose";
import { config } from "./config/config";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error";
import WrongRouteException from "./exceptions/WrongRouteException";

class App {
	public app: express.Application;

	constructor(controllers: Controller[]) {
		this.app = express();

		this.connectToTheDatabase();
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

	private initializeControllers(controllers: Controller[]) {
		controllers.forEach((controller) => {
			this.app.use("/", controller.router);
		});
	}

	private connectToTheDatabase() {
		mongoose.set("strictQuery", false);
		mongoose.connect(config.mongo.url, {
			retryWrites: true,
			w: "majority",
		});
	}
}

export default App;

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(express.json());

// app.use("/api", indexRouter);

// app.use((req, res) => {
// 	res.status(404).json({
// 		status: "error",
// 		code: 404,
// 		message: `Use correct api's routes`,
// 		data: "Not found",
// 	});
// });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
// 	res.status(500).json({
// 		status: "fail",
// 		code: 500,
// 		message: err.message,
// 		data: "Internal Server Error",
// 	});
// });

// export default app;
