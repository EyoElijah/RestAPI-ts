import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name
    });

    await author.save();

    return res.status(201).json({ author });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);
    if (author) {
      return res.status(200).json({ author });
    }
    return res.status(400).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await Author.find({});
    res.status(200).json({ authors });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findByIdAndUpdate({ _id: authorId }, req.body, {
      new: true
    });
    if (!author) {
      return res.status(400).json({ message: 'Not found' });
    }
    return res.status(200).json({ author });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findByIdAndDelete({ _id: authorId });
    if (!author) {
      return res.status(400).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
