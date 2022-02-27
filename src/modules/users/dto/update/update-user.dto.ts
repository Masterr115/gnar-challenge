import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'Person', required: true })
  name: string;
}
