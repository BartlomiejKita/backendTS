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
		`SELECT * FROM books WHERE book_title = ?`,
		[title]
	);
	if (result.length !== 0) {
		return result;
	}
}

async function getOneBook(bookId: string) {
	const [result] = await app.connection.query(
		`SELECT * FROM books WHERE book_id = ?`,
		[bookId]
	);
	if (result.length !== 0) {
		return result;
	}
}

async function createBook(title: string, pages: string) {
	const [result] = await app.connection.query(
		`INSERT INTO books (book_title, pages) VALUES (?,?)`,
		[title, pages]
	);
	const id = result.insertId;
	return getOneBook(id);
}

async function deleteBook(bookId: string) {
	const [result] = await app.connection.query(
		`DELETE FROM books WHERE book_id = ?`,
		[bookId]
	);
	return result;
}

async function updateBook(bookId: string, title: string, pages: string) {
	const [result] = await app.connection.query(
		`UPDATE books SET book_title = IFNULL(?, book_title), pages = IFNULL(?, pages) WHERE book_id = ?`,
		[title, pages, bookId]
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
