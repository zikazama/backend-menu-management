import { Menu as PrismaMenu } from '@prisma/client';
export declare class MenuEntity implements PrismaMenu {
    id: number;
    uuid: string;
    treeId: string | null;
    depth: number;
    name: string;
    parentId: number | null;
    createdAt: Date;
    updatedAt: Date;
}
