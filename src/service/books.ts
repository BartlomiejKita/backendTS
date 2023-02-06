import { Book } from "./schemas/book";
const {
	Types: { ObjectId },
} = require("mongoose");
// import mongoose from "mongoose";
// const ObjectId = mongoose.Types.ObjectId;

const findBookByTitle = async (title: string) => await Book.findOne({ title });

const getAllBooks = async (page: number, limit: number) =>
	Book.find({})
		.lean()
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.populate("authors");

const getOneBook = async (bookId: string) => {
	let objectIdBookId;
	try {
		objectIdBookId = ObjectId(bookId);
	} catch (error) {
		return null;
	}
	return Book.findOne({ _id: objectIdBookId }).lean().populate("authors");
};

const createBook = async (body: object) => await Book.create(body);

const deleteBook = async (bookId: string) => {
	let objectIdBookId;
	try {
		objectIdBookId = ObjectId(bookId);
	} catch (error) {
		return null;
	}
	return Book.deleteOne({ _id: objectIdBookId });
};

const updateBook = async (bookId: string, body: object) => {
	let objectIdBookId;
	try {
		objectIdBookId = ObjectId(bookId);
	} catch (error) {
		return null;
	}
	return Book.findOneAndUpdate(
		{
			_id: objectIdBookId,
		},
		{ $set: body },
		{
			new: true,
			runValidators: true,
			strict: "throw",
		}
	).populate("authors");
};

export default {
	findBookByTitle,
	getAllBooks,
	getOneBook,
	createBook,
	deleteBook,
	updateBook,
};
