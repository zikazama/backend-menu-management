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
exports.TreeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let TreeService = class TreeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTreeDto) {
        const { treeId, treeName } = createTreeDto;
        if (treeId) {
            const existingTree = await this.prisma.tree.findUnique({
                where: { treeId },
            });
            if (existingTree) {
                throw new common_1.ConflictException(`Tree with ID ${treeId} already exists`);
            }
        }
        return this.prisma.tree.create({
            data: {
                treeId,
                treeName,
            },
        });
    }
    async findAll() {
        return this.prisma.tree.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { menus: true },
                },
            },
        });
    }
    async findOne(id) {
        const tree = await this.prisma.tree.findUnique({
            where: { id },
            include: {
                menus: {
                    orderBy: [{ depth: 'asc' }, { id: 'asc' }],
                },
            },
        });
        if (!tree) {
            throw new common_1.NotFoundException(`Tree with ID ${id} not found`);
        }
        return tree;
    }
    async findByTreeId(treeId) {
        const tree = await this.prisma.tree.findUnique({
            where: { treeId },
            include: {
                menus: {
                    orderBy: [{ depth: 'asc' }, { id: 'asc' }],
                },
            },
        });
        if (!tree) {
            throw new common_1.NotFoundException(`Tree with treeId ${treeId} not found`);
        }
        return tree;
    }
    async update(id, updateTreeDto) {
        await this.findOne(id);
        return this.prisma.tree.update({
            where: { id },
            data: updateTreeDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.tree.delete({
            where: { id },
        });
    }
};
exports.TreeService = TreeService;
exports.TreeService = TreeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreeService);
//# sourceMappingURL=tree.service.js.map