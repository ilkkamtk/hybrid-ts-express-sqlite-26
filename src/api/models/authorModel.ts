import db from '../../database/db';
import {Author} from '../../types/LocalTypes';

const getAllAuthors = () => {
  return db.prepare<unknown[], Author>('SELECT * FROM authors').all();
};

const getAuthor = (id: number) => {
  return db
    .prepare<number, Author>('SELECT * FROM authors WHERE author_id = ?')
    .get(id);
};

const createAuthor = (author: Omit<Author, 'author_id'>) => {
  const stmt = db
    .prepare('INSERT INTO authors (name, email) VALUES (?, ?)')
    .run(author.name, author.email);
  if (!stmt.lastInsertRowid) {
    throw new Error('Failed to insert author');
  }
  return stmt.lastInsertRowid;
};

export {getAllAuthors, getAuthor, createAuthor};
