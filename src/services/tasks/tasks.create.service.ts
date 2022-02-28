import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../../models/tasks.entity';
import { TasksChildrenEntity } from '../../models/tasks_children.entity';
import { TasksOwnersEntity } from '../../models/tasks_owners.entity';
import { UsersEntity } from '../../models/users.entity';
import { CreateTaskDto } from '../../modules/tasks/dto/create/task-create.dto';
import { FindTaskByIdResponse } from '../../modules/tasks/dto/find/find-task-by-id.response';
import { UsersFindService } from '../users/users.find.service';
import { TasksFindService } from './tasks.find.service';

@Injectable()
export class TasksCreateService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    @InjectRepository(TasksOwnersEntity)
    private readonly tasksOwnerRepository: Repository<TasksOwnersEntity>,
    @InjectRepository(TasksChildrenEntity)
    private readonly tasksChildrenRepository: Repository<TasksChildrenEntity>,
    private usersFindService: UsersFindService,
    private tasksFindService: TasksFindService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const owners = [];
    const children = [];
    const findRequester = await this.usersFindService.findById(
      createTaskDto.requester,
    );

    if (!findRequester) {
      throw new BadRequestException('Requester not found!');
    }

    for (const owner of createTaskDto.owners) {
      const findOwner = await this.usersFindService.findById(owner);
      if (findOwner) {
        owners.push(findOwner);
      } else {
        throw new BadRequestException(`Owner '${owner}' not found!`);
      }
    }

    for (const child of createTaskDto.children) {
      const findTask = await this.tasksFindService.findById(child);
      if (findTask) {
        await this.validateTaskChild(createTaskDto, findTask);
        children.push(child);
      } else {
        throw new BadRequestException(`Task '${child}' not found!`);
      }
    }

    const newTaskToSave = this.tasksRepository.create();

    newTaskToSave.title = createTaskDto.title;
    newTaskToSave.description = createTaskDto.description;
    newTaskToSave.idRequester = createTaskDto.requester;
    newTaskToSave.due_date = createTaskDto.due_date;
    newTaskToSave.status = createTaskDto.status;

    const newTask = await this.tasksRepository.save(newTaskToSave);

    for (const owner of owners) {
      await this.insertTaskOwnersToTask(newTask.idTask, owner);
    }

    for (const child of children) {
      await this.insertTaskChildToParentTask(newTask.idTask, child);
    }

    return { success: true, idTask: newTask.idTask };
  }

  private async insertTaskOwnersToTask(idTask: string, owner: UsersEntity) {
    await this.tasksOwnerRepository.insert({
      idTask,
      idUser: owner.idUser,
    });
  }

  private async insertTaskChildToParentTask(
    idTaskParent: string,
    childTask: TasksEntity,
  ) {
    await this.tasksChildrenRepository.insert({
      idTaskParent,
      idTaskChild: childTask.idTask,
    });
  }

  private async validateTaskChild(
    createTaskDto: CreateTaskDto,
    child: FindTaskByIdResponse,
  ) {
    if (new Date(child.due_date) < new Date(createTaskDto.due_date)) {
      if (child.children == undefined) {
        if (createTaskDto.status == child.status) {
          return child;
        } else {
          throw new BadRequestException(
            `Task '${child.idTask}' has a different status: ${child.status}!`,
          );
        }
      } else {
        throw new BadRequestException(
          `Task '${child.idTask}' already has a parent!`,
        );
      }
    } else {
      throw new BadRequestException(
        `Task '${child.idTask}' was a due_date big than ${createTaskDto.due_date}!`,
      );
    }
  }
}
