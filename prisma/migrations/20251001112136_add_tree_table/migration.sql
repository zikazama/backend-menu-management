-- CreateTable
CREATE TABLE "trees" (
    "id" SERIAL NOT NULL,
    "treeId" TEXT NOT NULL,
    "treeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trees_treeId_key" ON "trees"("treeId");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "trees"("treeId") ON DELETE CASCADE ON UPDATE CASCADE;
