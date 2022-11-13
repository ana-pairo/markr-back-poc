import { Prisma, Users } from "@prisma/client";
import prismaClient from "@database/prismaClient";
import { Session } from "@protocols/bodies.type";

async function insertUser(
  data: Prisma.UsersUncheckedCreateInput
): Promise<Users> {
  return prismaClient.users.create({
    data,
  });
}

async function checkEmail(email: string): Promise<Users | null> {
  return prismaClient.users.findFirst({
    where: { email },
  });
}

async function createSession(
  data: Prisma.SessionCreateManyInput
): Promise<Session> {
  return prismaClient.session.create({
    data,
  });
}

async function checkToken(token: string): Promise<Session | null> {
  return prismaClient.session.findFirst({
    where: { token },
  });
}

async function deleteSession(token: string): Promise<Session> {
  return prismaClient.session.delete({
    where: { token },
  });
}

export { insertUser, checkEmail, createSession, checkToken, deleteSession };
