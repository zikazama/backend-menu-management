import { Tree as PrismaTree } from '@prisma/client';

export class TreeEntity implements PrismaTree {
  id: number;
  treeId: string;
  treeName: string;
  createdAt: Date;
  updatedAt: Date;
}
