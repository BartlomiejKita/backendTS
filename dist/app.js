"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use((0, morgan_1.default)(formatsLogger));
app.use(express_1.default.json());
app.use("/api", index_1.default);
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        code: 404,
        message: `Use api on routes: 
	/api/books with get to get Books
	/api/books/:id with get to get one Book
	/api/books with post to add Book
    /api/books/:id with patch to update Book
	/api/books/:id with delete to delete Book
	/api/authors with get to get Authors
	/api/authors/:id with get to get one Author
	/api/authors with post to add Author
    /api/authors/:id with patch to update Author
	/api/authors/:id with delete to delete Author
`,
        data: "Not found",
    });
});
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "fail",
        code: 500,
        message: err.message,
        data: "Internal Server Error",
    });
});
exports.default = app;
