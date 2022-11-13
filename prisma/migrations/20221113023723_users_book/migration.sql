-- CreateEnum
CREATE TYPE "StatusRole" AS ENUM ('finished', 'onGoing');

-- CreateTable
CREATE TABLE "users_books" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "digitalPlataform" BOOLEAN NOT NULL,
    "link" TEXT,
    "chaptersNumber" INTEGER,
    "pagesNumber" INTEGER,
    "status" "StatusRole" NOT NULL DEFAULT 'onGoing',

    CONSTRAINT "users_books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_books" ADD CONSTRAINT "users_books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
