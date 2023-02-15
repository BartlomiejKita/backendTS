import mysql from "mysql2";
import { config } from "../config/config";

const pool = mysql
	.createPool({
		host: config.mysql.host,
		user: config.mysql.user,
		password: config.mysql.password,
		database: config.mysql.database,
	})
	.promise();

async function getAllAuthors(page: number, limit: number) {
	const offset = (page - 1) * limit;
	const [result] = await pool.query(
		`SELECT * FROM authors LIMIT ${limit} OFFSET ${offset}`
	);
	return result;
}

async function findAuthorByName(name: string) {
	const [result] = await pool.query(`SELECT * FROM authors WHERE name = ?`, [
		name,
	]);
	if (result.length !== 0) {
		return result;
	}
}

async function getOneAuthor(authorId: string) {
	const [result] = await pool.query(`SELECT * FROM authors WHERE id = ?`, [
		authorId,
	]);
	if (result.length !== 0) {
		return result;
	}
}

async function createAuthor(name: string, books: string) {
	const [result] = await pool.query(
		`INSERT INTO authors (name, books) VALUES (?,?)`,
		[name, books]
	);
	const id = result.insertId;
	return getOneAuthor(id);
}

async function deleteAuthor(authorId: string) {
	const [result] = await pool.query(`DELETE FROM authors WHERE id = ?`, [
		authorId,
	]);
	return result;
}

async function updateAuthor(authorId: string, name: string, books: string) {
	const [result] = await pool.query(
		`UPDATE authors SET name = ?, books = ? WHERE id = ?`,
		[name, books, authorId]
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
