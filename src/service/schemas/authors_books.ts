// CREATE TABLE authors_books (
//     author_id INTEGER NOT NULL,
//     book_id INTEGER NOT NULL,
//     FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     PRIMARY KEY (author_id, book_id)
// );