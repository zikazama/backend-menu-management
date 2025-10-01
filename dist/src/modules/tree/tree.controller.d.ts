import { TreeService } from './tree.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
export declare class TreeController {
    private readonly treeService;
    constructor(treeService: TreeService);
    create(createTreeDto: CreateTreeDto): Promise<import("./entities/tree.entity").TreeEntity>;
    findAll(): Promise<import("./entities/tree.entity").TreeEntity[]>;
    findOne(id: number): Promise<import("./entities/tree.entity").TreeEntity>;
    findByTreeId(treeId: string): Promise<import("./entities/tree.entity").TreeEntity>;
    update(id: number, updateTreeDto: UpdateTreeDto): Promise<import("./entities/tree.entity").TreeEntity>;
    remove(id: number): Promise<import("./entities/tree.entity").TreeEntity>;
}
