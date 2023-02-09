"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    listen() {
        this.app.listen(config_1.config.server.port, () => {
            console.log(`App listening on the port ${config_1.config.server.port}`);
        });
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)("tiny"));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    connectToTheDatabase() {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(config_1.config.mongo.url, {
            retryWrites: true,
            w: "majority",
        });
    }
}
exports.default = App;
// const app = express();
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(logger(formatsLogger));
// app.use(express.json());
// app.use("/api", indexRouter);
// app.use((req, res) => {
// 	res.status(404).json({
// 		status: "error",
// 		code: 404,
// 		message: `Use correct api's routes`,
// 		data: "Not found",
// 	});
// });
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
// 	res.status(500).json({
// 		status: "fail",
// 		code: 500,
// 		message: err.message,
// 		data: "Internal Server Error",
// 	});
// });
// export default app;
