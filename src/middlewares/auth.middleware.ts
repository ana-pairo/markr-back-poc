import { NextFunction, Request, Response, Send } from "express";
import Joi from "joi";
import { STATUS_CODE } from "../enums/statusCode.js";
import { signUpSCHEMA, signInSCHEMA } from "../schemas/auth.schema.js";
import { checkEmail} from "../repositories/auth.repository.js";
import { SignIn, SignUp } from "../protocols/bodies.type.js";
import { User } from "../protocols/tables.types.js";


async function signUpMiddleware (req: Request, res: Response, next: NextFunction){
    
    const isBodyValid = signUpSCHEMA.validate(req.body, {abortEarly: false});

    const result = checkBody(res, isBodyValid);

    if(result) return; 

    const newUser = req.body as SignUp;

    try {
        const isEmailRepited = await checkEmail(newUser.email);
        console.log(isEmailRepited)
       
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

async function signInMiddleware (req: Request, res: Response, next: NextFunction){

    const isBodyValid = signInSCHEMA.validate(req.body, {abortEarly: false});

    const result = checkBody(res, isBodyValid);

    if (result) return;

    const data = req.body as SignIn;

    try {
        const user = await checkEmail(data.email);

        if(!user){
            res.sendStatus(STATUS_CODE.UNAUTHORIZED);
            return
        }

        res.locals.user = user;

        next();
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
        return
    }
}


export {signUpMiddleware, signInMiddleware}

function checkBody (res: Response, isBodyValid : Joi.ValidationResult){
   
    if(isBodyValid.error) {
        const errors : string[] = isBodyValid.error.details.map(
            (detail) => detail.message
        );
        
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors);
        
    }
}