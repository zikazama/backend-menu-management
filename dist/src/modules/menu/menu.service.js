"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let MenuService = class MenuService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMenuDto) {
        const { parentId, depth, name, treeId } = createMenuDto;
        let menuTreeId = treeId;
        if (treeId) {
            const tree = await this.prisma.tree.findUnique({
                where: { treeId },
            });
            if (!tree) {
                throw new common_1.NotFoundException(`Tree with treeId ${treeId} not found`);
            }
        }
        if (parentId) {
            const parentMenu = await this.prisma.menu.findUnique({
                where: { id: parentId },
            });
            if (!parentMenu) {
                throw new common_1.NotFoundException(`Parent menu with ID ${parentId} not found`);
            }
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
    async findAll() {
        return this.prisma.menu.findMany({
            orderBy: [{ depth: 'asc' }, { id: 'asc' }],
        });
    }
    async findOne(id) {
        const menu = await this.prisma.menu.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
            },
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        return menu;
    }
    async findByUuid(uuid) {
        const menu = await this.prisma.menu.findUnique({
            where: { uuid },
            include: {
                parent: true,
                children: true,
            },
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with UUID ${uuid} not found`);
        }
        return menu;
    }
    async update(id, updateMenuDto) {
        await this.findOne(id);
        const { parentId } = updateMenuDto;
        if (parentId !== undefined) {
            if (parentId === id) {
                throw new common_1.BadRequestException('A menu cannot be its own parent');
            }
            if (parentId !== null) {
                const parentMenu = await this.prisma.menu.findUnique({
                    where: { id: parentId },
                });
                if (!parentMenu) {
                    throw new common_1.NotFoundException(`Parent menu with ID ${parentId} not found`);
                }
            }
        }
        return this.prisma.menu.update({
            where: { id },
            data: updateMenuDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.menu.delete({
            where: { id },
        });
    }
    async getMenuTree(treeId) {
        const allMenus = await this.prisma.menu.findMany({
            where: treeId ? { treeId } : undefined,
            orderBy: [{ depth: 'asc' }, { id: 'asc' }],
        });
        return this.buildMenuTree(allMenus, null);
    }
    async getAllTrees() {
        const allMenus = await this.prisma.menu.findMany({
            orderBy: [{ treeId: 'asc' }, { depth: 'asc' }, { id: 'asc' }],
        });
        const treeGroups = allMenus.reduce((acc, menu) => {
            if (!acc[menu.treeId]) {
                acc[menu.treeId] = [];
            }
            acc[menu.treeId].push(menu);
            return acc;
        }, {});
        return Object.entries(treeGroups).map(([treeId, menus]) => ({
            treeId,
            menus: this.buildMenuTree(menus, null),
        }));
    }
    buildMenuTree(menus, parentId) {
        return menus
            .filter((menu) => menu.parentId === parentId)
            .map((menu) => ({
            ...menu,
            children: this.buildMenuTree(menus, menu.id),
        }));
    }
    async createTree(createMenuTreeDto) {
        const treeId = createMenuTreeDto.treeId;
        if (treeId) {
            const tree = await this.prisma.tree.findUnique({
                where: { treeId },
            });
            if (!tree) {
                throw new common_1.NotFoundException(`Tree with treeId ${treeId} not found`);
            }
        }
        return this.createMenuTreeRecursive(createMenuTreeDto, null, 0, treeId);
    }
    async createMenuTreeRecursive(menuData, parentId, depth, treeId) {
        const menu = await this.prisma.menu.create({
            data: {
                name: menuData.name,
                depth,
                parentId,
                treeId,
            },
        });
        if (menuData.children && menuData.children.length > 0) {
            const children = await Promise.all(menuData.children.map((childData) => this.createMenuTreeRecursive(childData, menu.id, depth + 1, menu.treeId)));
            return {
                ...menu,
                children,
            };
        }
        return menu;
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenuService);
//# sourceMappingURL=menu.service.js.map