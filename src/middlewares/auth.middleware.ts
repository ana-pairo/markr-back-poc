import { NextFunction, Request, Response, RequestHandler } from "express";
import { STATUS_CODE } from "@enums/statusCode";
import { signUpSCHEMA, signInSCHEMA } from "@schemas/auth.schema";
import { checkEmail, checkToken } from "@repositories/auth.repository";
import { SignIn, SignUp } from "@protocols/bodies.type";
import { checkBody } from "@middlewares/body.middleware";

async function signUpMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isBodyValid = signUpSCHEMA.validate(req.body, { abortEarly: false });

  const result = checkBody(res, isBodyValid);

  if (result) return;

  const newUser = req.body as SignUp;

  try {
    const isEmailRepited = await checkEmail(newUser.email);

    if (isEmailRepited) {
      res.status(STATUS_CODE.CONFLICT).send("This email is not available");
      return;
    }
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }

  next();
}

async function signInMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isBodyValid = signInSCHEMA.validate(req.body, { abortEarly: false });

  const result = checkBody(res, isBodyValid);

  if (result) return;

  const data = req.body as SignIn;

  try {
    const user = await checkEmail(data.email);

    if (!user) {
      res.sendStatus(STATUS_CODE.UNAUTHORIZED);
      return;
    }

    res.locals.user = user;

    next();
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function tokenAutentication(
  req: Request,
  res: Response<any, { userId: number; token: string }>,
  next: NextFunction
) {
  const token: string | undefined = req.headers.authorization?.replace(
    "Bearer ",
    ""
  );

  if (!token) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    return;
  }

  try {
    const session = await checkToken(token);

    if (session) {
      res.locals.userId = session.userId;
      res.locals.token = session.token;
    } else {
      res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
  } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }

  next();
}

export { signUpMiddleware, signInMiddleware, tokenAutentication };
