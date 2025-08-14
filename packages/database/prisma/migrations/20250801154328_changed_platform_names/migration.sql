/*
  Warnings:

  - You are about to drop the column `codeforcesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `leetcodeId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[leetcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeforces]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_codeforcesId_key";

-- DropIndex
DROP INDEX "User_githubId_key";

-- DropIndex
DROP INDEX "User_leetcodeId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "codeforcesId",
DROP COLUMN "githubId",
DROP COLUMN "leetcodeId",
ADD COLUMN     "codeforces" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "leetcode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_leetcode_key" ON "User"("leetcode");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_key" ON "User"("github");

-- CreateIndex
CREATE UNIQUE INDEX "User_codeforces_key" ON "User"("codeforces");
