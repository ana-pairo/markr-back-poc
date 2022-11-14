import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import "dotenv/config";

const server = express();
server.use(cors());
server.use(express.json());

import { tokenAutentication } from "@middlewares/auth.middleware";
import authRouter from "@routers/auth.router";
import booksRouter from "@routers/books.router";

server.use(authRouter);
server.use(tokenAutentication);
server.use(booksRouter);

server.get("/status", (req: Request, res: Response) => {
  res.sendStatus(200);
});

server.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
