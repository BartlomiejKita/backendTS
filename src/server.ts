import App from "./app";
import BooksController from "./controllers/books";

const app = new App([new BooksController()]);

app.listen();