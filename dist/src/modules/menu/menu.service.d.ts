import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuTreeDto } from './dto/create-menu-tree.dto';
import { MenuEntity } from './entities/menu.entity';
export declare class MenuService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMenuDto: CreateMenuDto): Promise<MenuEntity>;
    findAll(): Promise<MenuEntity[]>;
    findOne(id: number): Promise<MenuEntity>;
    findByUuid(uuid: string): Promise<MenuEntity>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<MenuEntity>;
    remove(id: number): Promise<MenuEntity>;
    getMenuTree(treeId?: string): Promise<MenuEntity[]>;
    getAllTrees(): Promise<any[]>;
    private buildMenuTree;
    createTree(createMenuTreeDto: CreateMenuTreeDto): Promise<MenuEntity>;
    private createMenuTreeRecursive;
}
