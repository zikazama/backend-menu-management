import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class MenuTreeNodeDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuTreeNodeDto)
  @IsOptional()
  children?: MenuTreeNodeDto[];
}

export class CreateMenuTreeDto {
  @IsString()
  @IsOptional()
  treeId?: string;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuTreeNodeDto)
  @IsOptional()
  children?: MenuTreeNodeDto[];
}
