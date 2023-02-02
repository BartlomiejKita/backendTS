import * as dotenv from "dotenv";
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";

const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zp20f30.mongodb.net/db-contacts?retryWrites=true&w=majority`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 9000;
console.log(process.env.PORT);
console.log(process.env.MONGO_USERNAME);
export const config = {
	mongo: {
		url: URI,
	},
	server: {
		port: PORT,
	},
};
