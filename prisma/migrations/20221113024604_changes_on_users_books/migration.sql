/*
  Warnings:

  - The values [onGoing] on the enum `StatusRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `digitalPlataform` on the `users_books` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusRole_new" AS ENUM ('finished', 'reding');
ALTER TABLE "users_books" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users_books" ALTER COLUMN "status" TYPE "StatusRole_new" USING ("status"::text::"StatusRole_new");
ALTER TYPE "StatusRole" RENAME TO "StatusRole_old";
ALTER TYPE "StatusRole_new" RENAME TO "StatusRole";
DROP TYPE "StatusRole_old";
ALTER TABLE "users_books" ALTER COLUMN "status" SET DEFAULT 'reding';
COMMIT;

-- AlterTable
ALTER TABLE "users_books" DROP COLUMN "digitalPlataform",
ALTER COLUMN "status" SET DEFAULT 'reding';
