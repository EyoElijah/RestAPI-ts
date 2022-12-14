import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author } = req.body;
    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      title,
      author
    });

    await book.save();
    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate('author');
    if (!book) return res.status(400).json({ message: 'Not found' });
    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find({}).populate('author');
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndUpdate({ _id: bookId }, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) return res.status(400).json({ message: 'Not found' });
    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) return res.status(400).json({ message: 'Not found' });
    return res.status(201).json({ message: 'deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
