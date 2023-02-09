"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const books_1 = __importDefault(require("./controllers/books"));
const app = new app_1.default([new books_1.default()]);
app.listen();
