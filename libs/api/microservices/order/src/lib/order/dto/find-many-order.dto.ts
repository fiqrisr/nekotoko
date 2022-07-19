import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class FindManyOrderDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(11)
  month?: number;

  @Type(() => Number)
  @IsInt()
  @Min(2022)
  @IsOptional()
  year?: number;

  @IsOptional()
  date?: string;
}
