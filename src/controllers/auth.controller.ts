import bcrypt from "bcrypt";

import { Request, Response } from "express";
import {
  createSession,
  deleteSession,
  insertUser,
} from "@repositories/auth.repository";
import { SignUp } from "@protocols/bodies.type";
import { User } from "@protocols/tables.types";
import { STATUS_CODE } from "@enums/statusCode";

async function registerNewUser(req: Request, res: Response) {
  const { email, name, password } = req.body as SignUp;

  const passwordHash: string = bcrypt.hashSync(password, 12);

  const newUser = { email, name, password: passwordHash } as SignUp;

  try {
    await insertUser(newUser);

    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function logInUser(req: Request, res: Response) {
  const user = res.locals.user as User;
  const password: string = req.body.password;

  const data: { userId: number } = {
    userId: user.id,
  };

  try {
    if (bcrypt.compareSync(password, user.password)) {
      const result = await createSession(data);

      const response = {
        token: result.token,
      };

      res.status(STATUS_CODE.CREATED).send(response);
    }
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

async function logOutUser(req: Request, res: Response) {
  const token: string = res.locals.token;

  try {
    await deleteSession(token);

    res.sendStatus(STATUS_CODE.NO_CONTENT);
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}

export { registerNewUser, logInUser, logOutUser };
