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
		message: `Use api on routes: 
	/api/books with get to get Books
	/api/books/:id with get to get one Book
	/api/books with post to add Book
    /api/books/:id with patch to update Book
	/api/books/:id with delete to delete Book
	/api/authors with get to get Authors
	/api/authors/:id with get to get one Author
	/api/authors with post to add Author
    /api/authors/:id with patch to update Author
	/api/authors/:id with delete to delete Author
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
