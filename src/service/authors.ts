import { app } from "../server";

async function getAllAuthors(page: number, limit: number) {
	const offset = (page - 1) * limit;
	const [result] = await app.connection.query(
		`SELECT* FROM authors LIMIT ${limit} OFFSET ${offset}`
	);
	return result;
}

async function findAuthorByName(name: string) {
	const [result] = await app.connection.query(
		`SELECT * FROM authors WHERE author_name = ?`,
		[name]
	);
	if (Array.isArray(result) && result.length) {
		return result;
	}
}

async function getOneAuthor(authorId: string) {
	const [result] = await app.connection.query(
		`SELECT * FROM authors WHERE author_id = ?`,
		[authorId]
	);
	if (Array.isArray(result) && result.length) {
		return result;
	}
}
async function createAuthor(name: string, birth_date: Date) {
	const [result] = await app.connection.query(
		`INSERT INTO authors (author_name, birth_date) VALUES (?,?)`,
		[name, birth_date]
	);
	return result;
}

async function deleteAuthor(authorId: string) {
	const [result] = await app.connection.query(
		`DELETE FROM authors WHERE author_id = ?`,
		[authorId]
	);
	return result;
}

async function updateAuthor(authorId: string, name: string, birth_date: Date) {
	const [result] = await app.connection.query(
		`UPDATE authors SET author_name = IFNULL(?, author_name), birth_date = IFNULL(?, birth_date) WHERE author_id = ?`,
		[name, birth_date, authorId]
	);
	return getOneAuthor(authorId);
}
export default {
	findAuthorByName,
	getAllAuthors,
	getOneAuthor,
	createAuthor,
	deleteAuthor,
	updateAuthor,
};
