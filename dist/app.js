"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const morgan_1 = __importDefault(require("morgan"));
const error_1 = __importDefault(require("./middlewares/error"));
const WrongRouteException_1 = __importDefault(require("./exceptions/WrongRouteException"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
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
    initializeErrorHandling() {
        this.app.use((req, res, next) => {
            next(new WrongRouteException_1.default());
        });
        this.app.use(error_1.default);
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
