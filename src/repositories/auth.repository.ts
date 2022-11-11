import { Prisma, Users } from "@prisma/client";
import prismaClient from "../database/prismaClient.js";
import { Session } from "../protocols/bodies.type.js";

async function insertUser (data:  Prisma.UsersUncheckedCreateInput ) : Promise<Users> {
    return  prismaClient.users.create({
    data
    })
    
}

async function checkEmail (email: string) : Promise<Users | null>{
    return prismaClient.users.findFirst({
        where:{email}
    })
}

async function createSession (data: Prisma.SessionCreateManyInput) : Promise<Session>{
   return prismaClient.session.create({
    data
   })
}

 export {insertUser, checkEmail, createSession}