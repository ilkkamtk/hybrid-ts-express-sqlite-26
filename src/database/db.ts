import Database from 'better-sqlite3';
import {
  checkData,
  exampleData,
  filename,
  tables,
  authors,
  checkAuthors,
  exampleAuthors,
} from './db-config';

const db = new Database(filename);
db.pragma('journal_mode = WAL');

// init tables, use exec only for CREATE TABLE
db.exec(tables);
db.exec(authors);

// chekck if the authors table is empty
const authorCount = (db.prepare(checkAuthors).get() as {count: number}).count;
// If the table is empty, insert example authors
if (authorCount === 0) {
  db.prepare(exampleAuthors).run();
  console.log('Inserted example authors.');
} else {
  console.log('Authors table already populated.');
}

// Check if the articles table is empty
const rowCount = (db.prepare(checkData).get() as {count: number}).count;
// If the table is empty, insert example data
if (rowCount === 0) {
  db.prepare(exampleData).run();
  console.log('Inserted example data.');
} else {
  console.log('Articles table already populated.');
}

export default db;
