import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  treeId?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  depth?: number;

  @IsInt()
  @IsOptional()
  parentId?: number;
}
