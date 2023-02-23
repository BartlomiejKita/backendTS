import { app } from "../server";

async function getAllBooks(
	page: number,
	limit: number,
	gt: string,
	lt: string
) {
	const offset = (page - 1) * limit;
	const [result] = await app.connection.query(
		`SELECT
				a.author_id,
				a.author_name,
				b.book_id,
				b.book_title,
				b.publish_date
		FROM
				authors as a 
						RIGHT JOIN 
				authors_books ON authors_books.author_id = a.author_id
						RIGHT JOIN
				books as b ON b.book_id = authors_books.book_id
				WHERE publish_date >= '${gt}' AND publish_date <= '${lt}'
				LIMIT ${limit} OFFSET ${offset};`
	);

	return result;
}

async function findBookByTitle(title: string) {
	const [result] = await app.connection.query(
		`SELECT * FROM books WHERE book_title = ?`,
		[title]
	);
	if (Array.isArray(result) && result.length) {
		return result;
	}
}

async function getOneBook(bookId: string) {
	const [result] = await app.connection.query(
		`SELECT 
				a.author_id, 
				a.author_name,
				b.book_id,
				b.book_title,
				b.publish_date
		 FROM 
		 		authors as a
						INNER JOIN
				authors_books ON authors_books.book_id = ? and
				authors_books.author_id = a.author_id
						INNER JOIN 
				books as b ON b.book_id = authors_books.book_id;`,
		[bookId]
	);
	if (Array.isArray(result) && result.length) {
		return result;
	}
}

async function createBook(title: string, pages: string, publish_date: Date) {
	const [result] = await app.connection.query(
		`INSERT INTO books (book_title, pages, publish_date) VALUES (?,?,?)`,
		[title, pages, publish_date]
	);

	// HOW TO RETURN DATA OF INSERTED BOOK WITHOUT USING ANY TYPE?
	// const id = (result as any).insertId;
	// return getOneBook(id);
	return result;
}

async function deleteBook(bookId: string) {
	const [result] = await app.connection.query(
		`DELETE FROM books WHERE book_id = ?`,
		[bookId]
	);
	return result;
}

async function updateBook(
	bookId: string,
	title: string,
	pages: string,
	publish_date: Date
) {
	await app.connection.query(
		`UPDATE books SET book_title = IFNULL(?, book_title), pages = IFNULL(?, pages), publish_date = IFNULL (?, publish_date) WHERE book_id = ?`,
		[title, pages, publish_date, bookId]
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
