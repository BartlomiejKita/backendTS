import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import indexRouter from "./routes/books"

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api", indexRouter);

app.use((req, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: `Use api on routes: 
	/api/ with get to get Books
	/api/ with post to post Book
    /api/:id with patch to update Book
	/api/:id with delete to delete Book
`,
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
