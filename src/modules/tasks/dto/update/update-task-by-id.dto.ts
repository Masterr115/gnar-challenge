import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { StatusEnum } from '../../../../models/tasks.entity';

@Exclude()
export class UpdateTaskByIdDto {
  @Expose()
  @IsEnum(StatusEnum)
  @ApiProperty({
    type: 'enum',
    enum: StatusEnum,
    example: StatusEnum.TODO,
    required: true,
  })
  status: StatusEnum;
}
