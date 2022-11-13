import { NextFunction, Request, Response } from "express";
import { checkBody } from "@middlewares/body.middleware";

import { newBookSCHEMA } from "@schemas/books.schema";
import { STATUS_CODE } from "@enums/statusCode";
import { checkRepeatedBook } from "@repositories/books.repository";
import { Book } from "@protocols/bodies.type";

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

export { addNewBookMiddleware };
