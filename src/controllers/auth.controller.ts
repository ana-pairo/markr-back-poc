import bcrypt from "bcrypt"

import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode.js";
import { createSession, insertUser } from "../repositories/auth.repository.js";
import {SignUp} from "../protocols/bodies.type.js";
import { User } from "../protocols/tables.types.js";


async function registerNewUser (req: Request, res:Response){

    const{email, name, password} = req.body as SignUp;

    const passwordHash : string = bcrypt.hashSync(password, 12);
  
    const newUser = {email, name, password: passwordHash} as SignUp;
console.log(newUser)
    try {
        await insertUser(newUser);

        res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        console.log(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function logInUser (req: Request, res:Response) {
    const user = res.locals.user as User;
    const password : string = req.body.password;

    const data : {userId: number}= {
        userId: user.id
    }

   
   try {
    if(bcrypt.compareSync(password, user.password)){
       const result = await createSession(data);

        res.status(STATUS_CODE.CREATED).send(result.token);
    }
   } catch (error) {
    res.sendStatus(STATUS_CODE.SERVER_ERROR);
   }
}

export {registerNewUser, logInUser}


