import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StatusEnum } from '../../../../models/tasks.entity';

@Exclude()
export class CreateTaskDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'Task Title', required: true })
  title: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Task Description', required: false })
  description: string;

  @Expose()
  @IsEnum(StatusEnum)
  @ApiProperty({
    type: 'enum',
    enum: StatusEnum,
    example: StatusEnum.TODO,
    required: true,
  })
  status: StatusEnum;

  @Expose()
  @IsUUID()
  @ApiProperty({
    example: 'f6874205-fc30-4294-9cb5-4cadcfb286c6',
    required: true,
  })
  requester: string;

  @Expose()
  @IsUUID(4, { each: true })
  @ApiProperty({
    example: ['f6874205-fc30-4294-9cb5-4cadcfb286c6'],
    isArray: true,
    required: true,
  })
  owners: string[];

  @Expose()
  @IsDefined({ message: 'due_date is required' })
  @IsDateString({ message: 'due_date must be a date' })
  @ApiProperty({ example: 'The due_date of task', required: true })
  due_date: Date;

  @Expose()
  @IsUUID(4, { each: true })
  @ApiProperty({
    example: ['00e526b6-0712-401f-9a75-eb740526e713'],
    required: false,
  })
  children: string[];
}
