import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 9000;
const MYSQL_HOST = process.env.MYSQL_HOST || "";
const MYSQL_USER = process.env.MYSQL_USER || "";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "";

export const config = {
	mysql: {
		host: MYSQL_HOST,
		user: MYSQL_USER,
		password: MYSQL_PASSWORD,
		database: MYSQL_DATABASE,
	},
	server: {
		port: PORT,
	},
};
