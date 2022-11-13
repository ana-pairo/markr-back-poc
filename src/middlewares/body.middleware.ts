import { Response } from "express";
import Joi from "joi";
import { STATUS_CODE } from "@enums/statusCode";

function checkBody(res: Response, isBodyValid: Joi.ValidationResult) {
  if (isBodyValid.error) {
    const errors: string[] = isBodyValid.error.details.map(
      (detail) => detail.message
    );

    return res.status(STATUS_CODE.UNPROCESSABLE).send(errors);
  }
}

export { checkBody };
