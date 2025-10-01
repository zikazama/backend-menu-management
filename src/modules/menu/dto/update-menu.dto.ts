import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  depth?: number;

  @IsInt()
  @IsOptional()
  parentId?: number;
}
