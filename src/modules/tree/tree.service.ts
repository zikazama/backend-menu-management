import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { TreeEntity } from './entities/tree.entity';

@Injectable()
export class TreeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTreeDto: CreateTreeDto): Promise<TreeEntity> {
    const { treeId, treeName } = createTreeDto;

    // Check if treeId already exists if provided
    if (treeId) {
      const existingTree = await this.prisma.tree.findUnique({
        where: { treeId },
      });

      if (existingTree) {
        throw new ConflictException(`Tree with ID ${treeId} already exists`);
      }
    }

    return this.prisma.tree.create({
      data: {
        treeId,
        treeName,
      },
    });
  }

  async findAll(): Promise<TreeEntity[]> {
    return this.prisma.tree.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { menus: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<TreeEntity> {
    const tree = await this.prisma.tree.findUnique({
      where: { id },
      include: {
        menus: {
          orderBy: [{ depth: 'asc' }, { id: 'asc' }],
        },
      },
    });

    if (!tree) {
      throw new NotFoundException(`Tree with ID ${id} not found`);
    }

    return tree;
  }

  async findByTreeId(treeId: string): Promise<TreeEntity> {
    const tree = await this.prisma.tree.findUnique({
      where: { treeId },
      include: {
        menus: {
          orderBy: [{ depth: 'asc' }, { id: 'asc' }],
        },
      },
    });

    if (!tree) {
      throw new NotFoundException(`Tree with treeId ${treeId} not found`);
    }

    return tree;
  }

  async update(id: number, updateTreeDto: UpdateTreeDto): Promise<TreeEntity> {
    // Check if tree exists
    await this.findOne(id);

    return this.prisma.tree.update({
      where: { id },
      data: updateTreeDto,
    });
  }

  async remove(id: number): Promise<TreeEntity> {
    // Check if tree exists
    await this.findOne(id);

    return this.prisma.tree.delete({
      where: { id },
    });
  }
}
