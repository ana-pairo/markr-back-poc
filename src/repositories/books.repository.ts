import { Prisma, UsersBooks } from "@prisma/client";
import prismaClient from "@database/prismaClient";

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

export { checkRepeatedBook, insertBook };
