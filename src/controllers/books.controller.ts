import { STATUS_CODE } from "@enums/statusCode";
import { UsersBooks } from "@prisma/client";
import { Book } from "@protocols/bodies.type";
import {
  deleteBook,
  getAllUserBooks,
  insertBook,
  uptadeBookStatus,
} from "@repositories/books.repository";
import { Request, Response, Send } from "express";

async function addBookToUserAccount(
  req: Request,
  res: Response<any, { userId: number; newBook: Omit<Book, "id"> }>
) {
  const { newBook } = res.locals;

  try {
    await insertBook(newBook);

    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function listUserBooks(
  req: Request,
  res: Response<any, { userId: number }>
) {
  const { userId } = res.locals;

  try {
    const booksList = await getAllUserBooks({ userId });

    res.status(STATUS_CODE.OK).send(booksList);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function deleteUserBook(
  req: Request,
  res: Response<any, { book: UsersBooks }>
) {
  const { book } = res.locals;

  try {
    await deleteBook(book);

    res.sendStatus(STATUS_CODE.NO_CONTENT);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function changeBookStatus(
  req: Request,
  res: Response<any, { book: UsersBooks }>
) {
  const { book } = res.locals;

  if (book.status === "reading") {
    book.status = "finished";
  } else {
    book.status = "reading";
  }

  try {
    await uptadeBookStatus(book);

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export {
  addBookToUserAccount,
  listUserBooks,
  deleteUserBook,
  changeBookStatus,
};
