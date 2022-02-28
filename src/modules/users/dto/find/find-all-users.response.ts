import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { PaginationResponse } from 'src/util/dto/pagination.response';

@Exclude()
export class FindAllUsersItemResponse {
  @Expose()
  @ApiProperty({
    example: 'f6874205-fc30-4294-9cb5-4cadcfb286c6',
    description: 'UserId',
  })
  idUser: string;

  @Expose()
  @ApiProperty({ example: 'Test' })
  name: string;
}

@Exclude()
export class FindAllUsersResponse {
  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => FindAllUsersItemResponse)
  @ApiProperty({ type: FindAllUsersItemResponse, isArray: true })
  users: FindAllUsersItemResponse[];

  @Expose()
  @Type(() => PaginationResponse)
  @ApiProperty({ type: PaginationResponse })
  pagination = new PaginationResponse();
}
