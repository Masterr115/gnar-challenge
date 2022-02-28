import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from '../../models/tasks.entity';
import { TasksChildrenEntity } from '../../models/tasks_children.entity';
import { TasksOwnersEntity } from '../../models/tasks_owners.entity';
import { TasksCreateService } from '../../services/tasks/tasks.create.service';
import { TasksFindService } from '../../services/tasks/tasks.find.service';
import { TasksUpdateService } from '../../services/tasks/tasks.update.service';
import { UsersModule } from '../users/users.module';

import { TasksController } from './tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TasksEntity,
      TasksOwnersEntity,
      TasksChildrenEntity,
    ]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksCreateService, TasksFindService, TasksUpdateService],
  exports: [TasksCreateService, TasksFindService, TasksUpdateService],
})
export class TasksModule {}
