import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksCreateService } from '../../services/tasks/tasks.create.service';
import { TasksFindService } from '../../services/tasks/tasks.find.service';
import { TasksUpdateService } from '../../services/tasks/tasks.update.service';
import { PaginationDto } from '../../util/dto/pagination.dto';
import { CreateTaskDto } from './dto/create/task-create.dto';
import { FindAllTasksResponse } from './dto/find/find-all-tasks.response';
import { FindTaskByIdResponse } from './dto/find/find-task-by-id.response';
import { UpdateTaskByIdDto } from './dto/update/update-task-by-id.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksCreateService: TasksCreateService,
    private tasksFindService: TasksFindService,
    private tasksUpdateService: TasksUpdateService,
  ) {}

  @Post('/new')
  @ApiOperation({ summary: 'Insert a new Task' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createNewTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksCreateService.create(createTaskDto);
  }

  @Get('/:idTask')
  @ApiOperation({ summary: 'Find Task by Id' })
  @ApiResponse({
    status: 200,
    type: FindTaskByIdResponse,
  })
  async findTaskById(@Param('idTask') idTask: string) {
    return this.tasksFindService.findById(idTask);
  }

  @Get('/')
  @ApiOperation({ summary: 'Find All tasks' })
  @ApiResponse({
    status: 200,
    type: FindAllTasksResponse,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  async findAllTasks(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.tasksFindService.findAllTasks({ limit, page } as PaginationDto);
  }

  @Put('/status/:idTask')
  @ApiOperation({ summary: 'Update Task by Id' })
  @ApiResponse({
    status: 200,
  })
  async updateTaskStatusById(
    @Param('idTask') idTask: string,
    @Body() updateTaskByIdDto: UpdateTaskByIdDto,
  ) {
    return this.tasksUpdateService.updateTaskStatus(idTask, updateTaskByIdDto);
  }
}
