"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config/config");
mongoose_1.default.set("strictQuery", false);
const connection = mongoose_1.default.connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
});
connection
    .then(() => {
    app_1.default.listen(config_1.config.server.port, () => {
        console.log(`Database connection successful. Use our API on port: ${config_1.config.server.port}`);
    });
})
    .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
});
