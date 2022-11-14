/*
  Warnings:

  - Added the required column `updatedAt` to the `users_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_books" ADD COLUMN     "insertedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
