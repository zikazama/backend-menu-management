-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "treeId" TEXT;

-- CreateIndex
CREATE INDEX "menus_treeId_idx" ON "menus"("treeId");
