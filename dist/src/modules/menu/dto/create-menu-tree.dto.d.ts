declare class MenuTreeNodeDto {
    name: string;
    children?: MenuTreeNodeDto[];
}
export declare class CreateMenuTreeDto {
    treeId?: string;
    name: string;
    children?: MenuTreeNodeDto[];
}
export {};
