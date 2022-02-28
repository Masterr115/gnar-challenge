import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'Number for the page',
    required: false,
  })
  @Transform((value) => {
    if (/^(\-|\+)?(\d+|Infinity)$/.test(value.value))
      return Number(value.value);
  })
  page = 1;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'Number for limit of results',
    required: false,
  })
  @Transform((value) => {
    if (/^(\-|\+)?(\d+|Infinity)$/.test(value.value))
      return Number(value.value);
  })
  limit = 100;
}
