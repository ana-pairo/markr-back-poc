import {
  addBookToUserAccount,
  changeBookStatus,
  deleteUserBook,
  listUserBooks,
} from "@controllers/books.controller";
import {
  addNewBookMiddleware,
  checkValidBook,
} from "@middlewares/books.middleware";
import express from "express";

const router = express.Router();

router.post("/book/new", addNewBookMiddleware, addBookToUserAccount);
router.get("/user-books", listUserBooks);
router.delete("/book/:id", checkValidBook, deleteUserBook);
router.put("/book/:id", checkValidBook, changeBookStatus);

export default router;
