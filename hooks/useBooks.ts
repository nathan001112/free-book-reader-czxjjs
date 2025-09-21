
import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { sampleBooks } from '../data/booksData';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setBooks(sampleBooks);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const searchBooks = (query: string, category: string = 'All'): Book[] => {
    let filteredBooks = books;

    if (category !== 'All') {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }

    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery) ||
        book.description.toLowerCase().includes(lowercaseQuery) ||
        book.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    return filteredBooks;
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };

  const getBooksByCategory = (category: string): Book[] => {
    if (category === 'All') return books;
    return books.filter(book => book.category === category);
  };

  return {
    books,
    loading,
    searchBooks,
    getBookById,
    getBooksByCategory,
  };
};
