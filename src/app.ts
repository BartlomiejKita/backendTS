import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import indexRouter from "./routes/index";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api", indexRouter);

app.use((req, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: `Use correct api's routes`,
		data: "Not found",
	});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({
		status: "fail",
		code: 500,
		message: err.message,
		data: "Internal Server Error",
	});
});

export default app;
