import { IsString, IsOptional } from 'class-validator';

export class UpdateTreeDto {
  @IsString()
  @IsOptional()
  treeName?: string;
}
