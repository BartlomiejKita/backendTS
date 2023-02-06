import { Book } from "./schemas/book";
const {
	Types: { ObjectId },
} = require("mongoose");

const findBookByTitle = async (title: string) => await Book.findOne({ title });

const getAllBooks = async (page: number, limit: number) =>
	Book.find({})
		.lean()
		.limit(limit * 1)
		.skip((page - 1) * limit);

const getOneBook = async (bookId: string) => {
	let objectIdBookId;
	try {
		objectIdBookId = ObjectId(bookId);
	} catch (error) {
		return null;
	}
	return Book.findOne({ _id: objectIdBookId }).lean();
};

const createBook = async (body: object) => Book.create(body);

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
	);
};

export default {
	findBookByTitle,
	getAllBooks,
	getOneBook,
	createBook,
	deleteBook,
	updateBook,
};
