import { Book } from "./schemas/book";

const {
	Types: { ObjectId },
} = require("mongoose");

const getAllBooks = async () => Book.find({}).lean();

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

export default { getAllBooks, getOneBook, createBook, deleteBook, updateBook };
