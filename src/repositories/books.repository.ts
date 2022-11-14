import { Prisma, UsersBooks } from "@prisma/client";
import prismaClient from "@database/prismaClient";
import { Book } from "@protocols/bodies.type";

async function checkRepeatedBook({
  userId,
  name,
}: Prisma.UsersBooksCreateManyInput): Promise<UsersBooks | null> {
  return prismaClient.usersBooks.findFirst({
    where: { userId, name },
  });
}

async function insertBook(
  data: Prisma.UsersBooksUncheckedCreateInput
): Promise<UsersBooks> {
  return prismaClient.usersBooks.create({
    data,
  });
}

async function getAllUserBooks({
  userId,
}: {
  userId: number;
}): Promise<UsersBooks[] | null> {
  return prismaClient.usersBooks.findMany({
    where: { userId },
  });
}

async function checkUserBookId({
  userId,
  id,
}: {
  userId: number;
  id: number;
}): Promise<UsersBooks | null> {
  return prismaClient.usersBooks.findFirst({
    where: { id, userId },
  });
}

async function deleteBook(data: UsersBooks): Promise<UsersBooks> {
  return prismaClient.usersBooks.delete({
    where: { id: data.id },
  });
}

async function uptadeBookStatus(data: UsersBooks): Promise<UsersBooks> {
  return prismaClient.usersBooks.update({
    where: { id: data.id },
    data: { status: data.status },
  });
}

export {
  checkRepeatedBook,
  insertBook,
  getAllUserBooks,
  checkUserBookId,
  deleteBook,
  uptadeBookStatus,
};
