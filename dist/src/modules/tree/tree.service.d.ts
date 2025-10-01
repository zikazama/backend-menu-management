import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { TreeEntity } from './entities/tree.entity';
export declare class TreeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTreeDto: CreateTreeDto): Promise<TreeEntity>;
    findAll(): Promise<TreeEntity[]>;
    findOne(id: number): Promise<TreeEntity>;
    findByTreeId(treeId: string): Promise<TreeEntity>;
    update(id: number, updateTreeDto: UpdateTreeDto): Promise<TreeEntity>;
    remove(id: number): Promise<TreeEntity>;
}
