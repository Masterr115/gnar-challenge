import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { StatusEnum } from '../../../../models/tasks.entity';
import { PaginationResponse } from '../../../../util/dto/pagination.response';

@Exclude()
export class TaskOwnerItem {
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
export class TaskOwnersItem {
  @Expose()
  @ApiProperty({ type: TaskOwnerItem })
  @Type(() => TaskOwnerItem)
  ownerUser: TaskOwnerItem;
}

@Exclude()
export class TaskChildItem {
  @Expose()
  @ApiProperty({ example: '473c126b-5d78-4950-8eb4-75bda1f53531' })
  idTask: string;

  @Expose()
  @ApiProperty({ example: 'Task Title' })
  title: string;
}

@Exclude()
export class TaskChildrenItem {
  @Expose()
  @IsArray()
  @Type(() => TaskChildItem)
  @ApiProperty({ type: TaskChildrenItem, isArray: true })
  taskChild: TaskChildrenItem[];
}

@Exclude()
export class TaskParentsItemItem {
  @Expose()
  @ApiProperty({ example: '473c126b-5d78-4950-8eb4-75bda1f53531' })
  idTask: string;

  @Expose()
  @ApiProperty({ example: 'Task Title' })
  title: string;
}

@Exclude()
export class TaskParentItem {
  @Expose()
  @IsArray()
  @Type(() => TaskParentsItemItem)
  @ApiProperty({ type: TaskParentsItemItem })
  taskParent: TaskParentsItemItem;
}

@Exclude()
export class TaskItem {
  @Expose()
  @ApiProperty({ example: '473c126b-5d78-4950-8eb4-75bda1f53531' })
  idTask: string;

  @Expose()
  @ApiProperty({ example: 'Task Title' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'Task Description' })
  description: string;

  @Expose()
  @ApiProperty({
    type: 'enum',
    enum: StatusEnum,
    example: StatusEnum.TODO,
  })
  status: StatusEnum;

  @Expose()
  @ApiProperty({ example: 'Task due_date' })
  due_date: string;

  @Expose()
  @ApiProperty({
    example: 'f6874205-fc30-4294-9cb5-4cadcfb286c6',
  })
  requester: string;

  @Expose()
  @IsArray()
  @Type(() => TaskOwnersItem)
  @ApiProperty({ type: TaskOwnersItem, isArray: true })
  owners: TaskOwnersItem[];

  @Expose()
  @IsArray()
  @Type(() => TaskChildrenItem)
  @ApiProperty({ type: TaskChildrenItem, isArray: true })
  children: TaskChildrenItem[];

  @Expose()
  @IsArray()
  @Type(() => TaskParentItem)
  @ApiProperty({ type: TaskParentItem })
  parent: TaskParentItem;

  @Expose()
  @ApiProperty({ example: '2022-02-27T23:27:20.588Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2022-02-27T23:27:20.588Z' })
  updatedAt: Date;
}

@Exclude()
export class FindAllTasksResponse {
  @Expose()
  @IsArray()
  @Type(() => TaskItem)
  @ApiProperty({ type: TaskItem, isArray: true })
  tasks: TaskItem[];

  @Expose()
  @Type(() => PaginationResponse)
  @ApiProperty({ type: PaginationResponse })
  pagination = new PaginationResponse();
}
