import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuTreeDto } from './dto/create-menu-tree.dto';
import { MenuEntity } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    const { parentId, depth, name, treeId } = createMenuDto;

    let menuTreeId = treeId;

    // Validate treeId if provided
    if (treeId) {
      const tree = await this.prisma.tree.findUnique({
        where: { treeId },
      });

      if (!tree) {
        throw new NotFoundException(`Tree with treeId ${treeId} not found`);
      }
    }

    // Validate parentId if provided
    if (parentId) {
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (!parentMenu) {
        throw new NotFoundException(`Parent menu with ID ${parentId} not found`);
      }

      // If parent exists, use parent's treeId
      menuTreeId = parentMenu.treeId;
    }

    return this.prisma.menu.create({
      data: {
        name,
        depth: depth ?? 0,
        parentId,
        treeId: menuTreeId,
      },
    });
  }

  async findAll(): Promise<MenuEntity[]> {
    return this.prisma.menu.findMany({
      orderBy: [{ depth: 'asc' }, { id: 'asc' }],
    });
  }

  async findOne(id: number): Promise<MenuEntity> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async findByUuid(uuid: string): Promise<MenuEntity> {
    const menu = await this.prisma.menu.findUnique({
      where: { uuid },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with UUID ${uuid} not found`);
    }

    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    // Check if menu exists
    await this.findOne(id);

    const { parentId } = updateMenuDto;

    // Validate parentId if provided
    if (parentId !== undefined) {
      if (parentId === id) {
        throw new BadRequestException('A menu cannot be its own parent');
      }

      if (parentId !== null) {
        const parentMenu = await this.prisma.menu.findUnique({
          where: { id: parentId },
        });

        if (!parentMenu) {
          throw new NotFoundException(`Parent menu with ID ${parentId} not found`);
        }
      }
    }

    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async remove(id: number): Promise<MenuEntity> {
    // Check if menu exists
    await this.findOne(id);

    return this.prisma.menu.delete({
      where: { id },
    });
  }

  async getMenuTree(treeId?: string): Promise<MenuEntity[]> {
    const allMenus = await this.prisma.menu.findMany({
      where: treeId ? { treeId } : undefined,
      orderBy: [{ depth: 'asc' }, { id: 'asc' }],
    });

    return this.buildMenuTree(allMenus, null);
  }

  async getAllTrees(): Promise<any[]> {
    const allMenus = await this.prisma.menu.findMany({
      orderBy: [{ treeId: 'asc' }, { depth: 'asc' }, { id: 'asc' }],
    });

    // Group menus by treeId
    const treeGroups = allMenus.reduce((acc, menu) => {
      if (!acc[menu.treeId]) {
        acc[menu.treeId] = [];
      }
      acc[menu.treeId].push(menu);
      return acc;
    }, {} as Record<string, any[]>);

    // Build tree for each group
    return Object.entries(treeGroups).map(([treeId, menus]) => ({
      treeId,
      menus: this.buildMenuTree(menus, null),
    }));
  }

  private buildMenuTree(menus: any[], parentId: number | null): any[] {
    return menus
      .filter((menu) => menu.parentId === parentId)
      .map((menu) => ({
        ...menu,
        children: this.buildMenuTree(menus, menu.id),
      }));
  }

  async createTree(createMenuTreeDto: CreateMenuTreeDto): Promise<MenuEntity> {
    const treeId = createMenuTreeDto.treeId;

    // Validate treeId if provided
    if (treeId) {
      const tree = await this.prisma.tree.findUnique({
        where: { treeId },
      });

      if (!tree) {
        throw new NotFoundException(`Tree with treeId ${treeId} not found`);
      }
    }

    return this.createMenuTreeRecursive(createMenuTreeDto, null, 0, treeId);
  }

  private async createMenuTreeRecursive(
    menuData: CreateMenuTreeDto | any,
    parentId: number | null,
    depth: number,
    treeId?: string,
  ): Promise<MenuEntity> {
    // Create the current menu item
    const menu = await this.prisma.menu.create({
      data: {
        name: menuData.name,
        depth,
        parentId,
        treeId,
      },
    });

    // Create children recursively if they exist
    if (menuData.children && menuData.children.length > 0) {
      const children = await Promise.all(
        menuData.children.map((childData) =>
          this.createMenuTreeRecursive(childData, menu.id, depth + 1, menu.treeId),
        ),
      );

      // Return the menu with children
      return {
        ...menu,
        children,
      } as any;
    }

    return menu;
  }
}
