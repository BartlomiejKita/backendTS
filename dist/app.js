"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const config_1 = require("./config/config");
const morgan_1 = __importDefault(require("morgan"));
const error_1 = __importDefault(require("./middlewares/error"));
const WrongRouteException_1 = __importDefault(require("./exceptions/WrongRouteException"));
class App {
    constructor(controllers) {
        this.connection = mysql2_1.default.createPool({
            host: config_1.config.mysql.host,
            user: config_1.config.mysql.user,
            password: config_1.config.mysql.password,
            database: config_1.config.mysql.database,
        }).promise();
        this.app = (0, express_1.default)();
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
}
exports.default = App;
