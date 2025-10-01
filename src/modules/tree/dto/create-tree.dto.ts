import { IsString, IsOptional } from 'class-validator';

export class CreateTreeDto {
  @IsString()
  @IsOptional()
  treeId?: string;

  @IsString()
  treeName: string;
}
