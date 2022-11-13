/*
  Warnings:

  - The values [reding] on the enum `StatusRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusRole_new" AS ENUM ('finished', 'reading');
ALTER TABLE "users_books" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users_books" ALTER COLUMN "status" TYPE "StatusRole_new" USING ("status"::text::"StatusRole_new");
ALTER TYPE "StatusRole" RENAME TO "StatusRole_old";
ALTER TYPE "StatusRole_new" RENAME TO "StatusRole";
DROP TYPE "StatusRole_old";
ALTER TABLE "users_books" ALTER COLUMN "status" SET DEFAULT 'reading';
COMMIT;

-- AlterTable
ALTER TABLE "users_books" ALTER COLUMN "status" SET DEFAULT 'reading';
