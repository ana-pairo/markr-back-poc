import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/statusCode.js";
import { signUpSCHEMA } from "../schemas/auth.schema.js";
import { checkEmail} from "../repositories/auth.repository.js";
import { SignUp } from "../protocols/auth.type.js";


async function signUpMiddleware (req: Request, res: Response, next: NextFunction){
    
    const isBodyValid = signUpSCHEMA.validate(req.body, {abortEarly: false});

    if(isBodyValid.error) {
        const errors : string[] = isBodyValid.error.details.map(
            (detail) => detail.message
        );
        
        res.status(STATUS_CODE.UNPROCESSABLE).send(errors);
        return 
    }
    const newUser = req.body as SignUp;

    try {
        const isEmailRepited = (await checkEmail(newUser.email));
       
        if(isEmailRepited) {
            res.status(STATUS_CODE.CONFLICT).send("This email is not available");
            return
        }
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return
    }
    
    next()
}

export {signUpMiddleware}