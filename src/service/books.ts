import { app } from "../server";

async function getAllBooks(page: number, limit: number) {
	const offset = (page - 1) * limit;
	const [result] = await app.connection.query(
		`SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`
	);

	return result;
}

async function findBookByTitle(title: string) {
	const [result] = await app.connection.query(
		`SELECT * FROM books WHERE title = ?`,
		[title]
	);
	if (result.length !== 0) {
		return result;
	}
}

async function getOneBook(bookId: string) {
	const [result] = await app.connection.query(
		`SELECT * FROM books WHERE id = ?`,
		[bookId]
	);
	if (result.length !== 0) {
		return result;
	}
}

async function createBook(title: string, authors: string) {
	const [result] = await app.connection.query(
		`INSERT INTO books (title, authors) VALUES (?,?)`,
		[title, authors]
	);
	const id = result.insertId;
	return getOneBook(id);
}

async function deleteBook(bookId: string) {
	const [result] = await app.connection.query(
		`DELETE FROM books WHERE id = ?`,
		[bookId]
	);
	return result;
}

async function updateBook(bookId: string, title: string, authors: string) {
	const [result] = await app.connection.query(
		`UPDATE books SET title = ?, authors = ? WHERE id = ?`,
		[title, authors, bookId]
	);
	return getOneBook(bookId);
}

export default {
	findBookByTitle,
	getAllBooks,
	getOneBook,
	createBook,
	deleteBook,
	updateBook,
};
