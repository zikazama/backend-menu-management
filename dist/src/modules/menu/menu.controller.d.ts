import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuTreeDto } from './dto/create-menu-tree.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: CreateMenuDto): Promise<import("./entities/menu.entity").MenuEntity>;
    createTree(createMenuTreeDto: CreateMenuTreeDto): Promise<import("./entities/menu.entity").MenuEntity>;
    findAll(): Promise<import("./entities/menu.entity").MenuEntity[]>;
    getAllTrees(): Promise<any[]>;
    getMenuTreeById(treeId: string): Promise<import("./entities/menu.entity").MenuEntity[]>;
    getMenuTree(): Promise<import("./entities/menu.entity").MenuEntity[]>;
    findOne(id: number): Promise<import("./entities/menu.entity").MenuEntity>;
    findByUuid(uuid: string): Promise<import("./entities/menu.entity").MenuEntity>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<import("./entities/menu.entity").MenuEntity>;
    remove(id: number): Promise<import("./entities/menu.entity").MenuEntity>;
}
