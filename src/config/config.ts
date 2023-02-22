import * as dotenv from "dotenv";
dotenv.config();

export const config = {
	mysql: {
		host: process.env.MYSQL_HOST || "",
		user: process.env.MYSQL_USER || "",
		password: process.env.MYSQL_PASSWORD || "",
		database: process.env.MYSQL_DATABASE || "",
	},
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : 9000,
	},
};
