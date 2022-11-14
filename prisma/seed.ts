import prismaClient from "@database/prismaClient";
import { Prisma, StatusRole, Users, UsersBooks } from "@prisma/client";
import { Book, SignUp } from "@protocols/bodies.type";
import bcrypt from "bcrypt";

async function seedingUser(data: Prisma.UsersCreateInput): Promise<Users> {
  return prismaClient.users.create({ data });
}

async function seedingBook(
  data: Prisma.UsersBooksCreateManyInput
): Promise<UsersBooks> {
  return prismaClient.usersBooks.create({ data });
}

async function main() {
  const password: string = bcrypt.hashSync("Teste123!", 12);
  const userData: SignUp = {
    name: "Conta Teste",
    email: "teste@teste.com",
    password,
  };

  try {
    const userResult = await seedingUser(userData);

    const bookResult = await seedingBook({
      userId: userResult.id,
      name: "Circo da noite",
      pagesNumber: 432,
      status: StatusRole.reading,
    });

    console.log(
      `User ${userResult.name} and book ${bookResult.name} were successfully inserted`
    );
  } catch (error) {
    console.log(error);
  }
}

main();
