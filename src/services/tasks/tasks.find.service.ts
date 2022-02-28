import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { TasksEntity } from '../../models/tasks.entity';
import { FindAllTasksResponse } from '../../modules/tasks/dto/find/find-all-tasks.response';
import { FindTaskByIdResponse } from '../../modules/tasks/dto/find/find-task-by-id.response';
import { PaginationDto } from '../../util/dto/pagination.dto';

@Injectable()
export class TasksFindService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async findById(idTask: string): Promise<FindTaskByIdResponse> {
    const findTask = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.owners', 'owners')
      .leftJoinAndSelect('owners.ownerUser', 'ownerUser')
      .leftJoinAndSelect('task.children', 'children')
      .leftJoinAndSelect('children.taskChild', 'taskChild')
      .leftJoinAndSelect('task.parent', 'parent')
      .leftJoinAndSelect('parent.taskParent', 'taskParent')
      .where('task.idTask = :idTask', { idTask })
      .getOne();

    const response = plainToInstance(FindTaskByIdResponse, findTask);

    return response;
  }

  async findAllTasks(
    paginationDto: PaginationDto,
  ): Promise<FindAllTasksResponse> {
    const take = +paginationDto.limit || 100;
    const page = +paginationDto.page || 1;
    const skip = (page - 1) * take;

    const findTasks = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.owners', 'owners')
      .leftJoinAndSelect('owners.ownerUser', 'ownerUser')
      .leftJoinAndSelect('task.children', 'children')
      .leftJoinAndSelect('children.taskChild', 'taskChild')
      .leftJoinAndSelect('task.parent', 'parent')
      .leftJoinAndSelect('parent.taskParent', 'taskParent')
      .orderBy('task.due_date', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const response = plainToInstance(FindAllTasksResponse, {
      tasks: findTasks[0],
    });

    response.pagination = {
      totalRows: +findTasks[1],
      totalPages: Math.ceil(+findTasks[1] / take),
      actualPage: page,
    };

    return response;
  }
}
