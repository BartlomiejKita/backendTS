import { Author } from "./schemas/author";
const {
	Types: { ObjectId },
} = require("mongoose");

const findAuthorByName = async (name: string) => await Author.findOne({ name });

const getAllAuthors = async (page: number, limit: number) =>
	Author.find({})
		.lean()
		.limit(limit * 1)
		.skip((page - 1) * limit);

const getOneAuthor = async (authorId: string) => {
	let objectIdAuthorId;
	try {
		objectIdAuthorId = ObjectId(authorId);
	} catch (error) {
		return null;
	}
	return Author.findOne({ _id: objectIdAuthorId }).lean();
};

const createAuthor = async (body: object) => Author.create(body);

const deleteAuthor = async (authorId: string) => {
	let objectIdAuthorId;
	try {
		objectIdAuthorId = ObjectId(authorId);
	} catch (error) {
		return null;
	}
	return Author.deleteOne({ _id: objectIdAuthorId });
};

const updateAuthor = async (authorId: string, body: object) => {
	let objectIdAuthorId;
	try {
		objectIdAuthorId = ObjectId(authorId);
	} catch (error) {
		return null;
	}
	return Author.findOneAndUpdate(
		{
			_id: objectIdAuthorId,
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
	findAuthorByName,
	getAllAuthors,
	getOneAuthor,
	createAuthor,
	deleteAuthor,
	updateAuthor,
};
