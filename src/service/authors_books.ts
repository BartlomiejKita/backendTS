import { app } from "../server";

async function getBookWithAuthors(bookId: string) {
	const [result] = await app.connection.query(
		`SELECT
		authors_books.author_id,
		authors.author_name,
		authors_books.book_id,
		books.book_title
		FROM authors_books
		INNER JOIN authors  ON authors.author_id = authors_books.author_id
		INNER JOIN books  ON books.book_id = authors_books.book_id and books.book_id = ?;`,
		[bookId]
	);
	if (result.length !== 0) {
		return result;
	}
}

async function relateAuthorsBooks(author: string, book: string) {
	const [result] = await app.connection.query(
		`INSERT INTO authors_books (author_id, book_id) VALUES (?,?);`,
		[author, book]
	);
	const id = book;

	return getBookWithAuthors(id);
}

export default {
	getBookWithAuthors,
	relateAuthorsBooks,
};
