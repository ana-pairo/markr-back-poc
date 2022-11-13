import { STATUS_CODE } from "@enums/statusCode";
import { Book } from "@protocols/bodies.type";
import { insertBook } from "@repositories/books.repository";
import { Request, Response } from "express";

async function addBookToUserAccount(
  req: Request,
  res: Response<any, { userId: number; newBook: Omit<Book, "id"> }>
) {
  const { newBook } = res.locals;

  try {
    await insertBook(newBook);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { addBookToUserAccount };
