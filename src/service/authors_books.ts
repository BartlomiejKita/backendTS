import { app } from "../server";

async function getBookWithAuthors(bookId: string) {
	const [result] = await app.connection.query(
		`SELECT *
        FROM authors 
        INNER JOIN  authors_books ON authors_books.book_id = ? and authors_books.author_id = authors.author_id;`,
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
