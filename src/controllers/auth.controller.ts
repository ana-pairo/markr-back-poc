import bcrypt from "bcrypt"

import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode.js";
import { insertUser } from "../repositories/auth.repository.js";
import {SignUp} from "../protocols/auth.type.js";


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

export {registerNewUser}


