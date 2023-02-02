import { RequestHandler } from "express";

import service from "../service/books";

const get: RequestHandler = async (req, res, next) => {
	try {
		const books = await service.getAllBooks();
		res.json({
			status: "success",
			code: 200,
			data: books,
		});
	} catch (error) {
		next(error);
	}
};

const getOne: RequestHandler<{ id: string }> = async (req, res, next) => {
	try {
		const book = await service.getOneBook(req.params.id);
		if (book) {
			res.json({
				status: "success",
				code: 200,
				data: book,
			});
		} else {
			res.json({
				status: "failure",
				code: 404,
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};

const post: RequestHandler = async (req, res, next) => {
	try {
		const newBook = await service.createBook(req.body);
		res.json({
			status: "success",
			code: 201,
			message: "New book has been added",
			data: newBook,
		});
	} catch (error) {
		next(error);
	}
};

const deleteBook: RequestHandler<{ id: string }> = async (req, res, next) => {
	try {
		const book = await service.deleteBook(req.params.id);
		if (book) {
			res.json({
				status: "success",
				code: 200,
				message: "Book has been removed",
			});
		} else {
			res.json({
				status: "failure",
				code: 404,
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};

const put: RequestHandler<{ id: string }>= async (req, res, next) => {
	try {
		const book = await service.updateBook(req.params.id, req.body);
		if (book) {
			return res.json({
				status: "success",
				code: 200,
				message: "Book has been updated",
				data: book,
			});
		} else {
			return res.status(404).json({
				status: "failure",
				code: 404,
				message: "Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};



export default { get, getOne, post, deleteBook, put };
