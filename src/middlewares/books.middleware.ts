import { NextFunction, Request, Response } from "express";
import { checkBody } from "@middlewares/body.middleware";

import { newBookSCHEMA } from "@schemas/books.schema";
import { STATUS_CODE } from "@enums/statusCode";
import {
  checkRepeatedBook,
  checkUserBookId,
} from "@repositories/books.repository";
import { Book } from "@protocols/bodies.type";
import { UsersBooks } from "@prisma/client";

async function addNewBookMiddleware(
  req: Request,
  res: Response<any, { userId: number; newBook: Omit<Book, "id"> }>,
  next: NextFunction
) {
  const isBodyValid = newBookSCHEMA.validate(req.body, { abortEarly: false });
  const name: string = req.body.name;
  const newBook = req.body as Omit<Book, "id">;
  const userId = res.locals.userId;

  newBook.userId = userId;

  const result = checkBody(res, isBodyValid);

  if (result) return;

  try {
    const book = await checkRepeatedBook({ userId, name });

    if (book) {
      res.sendStatus(STATUS_CODE.CONFLICT);
      return;
    }
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }

  res.locals.newBook = newBook;
  next();
}

async function checkValidBook(
  req: Request<{ id: string }>,
  res: Response<any, { userId: number; book: UsersBooks }>,
  next: NextFunction
) {
  const { userId } = res.locals;
  const bookId: number = Number(req.params.id);

  if (!bookId) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const book = await checkUserBookId({ userId, id: bookId });

    if (!book) {
      res.sendStatus(STATUS_CODE.NOT_FOUND);
      return;
    }

    res.locals.book = book;
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }

  next();
}

export { addNewBookMiddleware, checkValidBook };
