import { Prisma, Users } from "@prisma/client";
import prismaClient from "../database/prismaClient.js";

async function insertUser (data:  Prisma.UsersUncheckedCreateInput ) : Promise<Users> {
const resultado = prismaClient.users.create({
    data
    })
    return resultado
}

async function checkEmail (email: string) : Promise<Users | null>{
    return prismaClient.users.findFirst({
        where:{email}
    })
}

 export {insertUser, checkEmail}