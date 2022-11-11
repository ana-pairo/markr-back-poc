import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { STATUS_CODE } from "../enums/statusCode.js";
import { signUpSCHEMA, signInSCHEMA } from "../schemas/auth.schema.js";
import { checkEmail, checkToken} from "../repositories/auth.repository.js";
import { SignIn, SignUp } from "../protocols/bodies.type.js";



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


async function tokenAutentication (req: Request, res: Response, next: NextFunction){

    const token : string | undefined = req.headers.authorization?.replace("Bearer ", "");

    if(!token){
        res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        return
    }

    try {
       const session =  await checkToken(token);

       if(session){
        res.locals.userId = session.userId;
        res.locals.token = session.token;
       }else{
        res.sendStatus(STATUS_CODE.UNAUTHORIZED)
       }

       next();
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export {signUpMiddleware, signInMiddleware, tokenAutentication}

function checkBody (res: Response, isBodyValid : Joi.ValidationResult){
   
    if(isBodyValid.error) {
        const errors : string[] = isBodyValid.error.details.map(
            (detail) => detail.message
        );
        
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors);
        
    }
}