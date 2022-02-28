import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaginationResponse {
  @Expose()
  @ApiProperty({ example: 1, description: 'Number for limit of rows' })
  totalRows: number;

  @Expose()
  @ApiProperty({ example: 1, description: 'Number of total pages' })
  totalPages: number;

  @Expose()
  @ApiProperty({ example: 1, description: 'Actual Page' })
  actualPage: number;
}
