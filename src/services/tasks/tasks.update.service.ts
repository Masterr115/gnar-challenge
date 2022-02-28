import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../../models/tasks.entity';
import { UpdateTaskByIdDto } from '../../modules/tasks/dto/update/update-task-by-id.dto';

@Injectable()
export class TasksUpdateService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async updateTaskStatus(idTask: string, updateTaskByIdDto: UpdateTaskByIdDto) {
    const findTask = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.children', 'children')
      .leftJoinAndSelect('children.taskChild', 'taskChild')
      .where('task.idTask = :idTask', { idTask })
      .getOne();

    if (findTask.children.length > 0) {
      for (const task of findTask.children) {
        if (task.taskChild.status != updateTaskByIdDto.status) {
          throw new ForbiddenException(
            `You cannot edit this task status because a child ${task.taskChild.idTask} have a status ${task.taskChild.status}, change it first!`,
          );
        }
      }
    }

    await this.tasksRepository.update(
      { idTask },
      { status: updateTaskByIdDto.status },
    );

    return { success: true };
  }
}
