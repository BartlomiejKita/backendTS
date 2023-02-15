import App from "./app";
import AuthorsController from "./controllers/authors";
import BooksController from "./controllers/books";

const app = new App([new BooksController(), new AuthorsController()]);

app.listen();


