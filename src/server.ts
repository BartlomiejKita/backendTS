import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/config";



mongoose.set("strictQuery", false);
const connection = mongoose.connect(config.mongo.url);
connection
	.then(() => {
		app.listen(config.server.port, () => {
			console.log(
				`Database connection successful. Use our API on port: ${config.server.port}`
			);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
