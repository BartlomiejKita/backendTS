import App from "./app";
import AuthorsController from "./controllers/authors";
import AuthorsBooksController from "./controllers/authors_books";
import BooksController from "./controllers/books";

export const app = new App([
	new BooksController(),
	new AuthorsController(),
	new AuthorsBooksController(),
]);

app.listen();
