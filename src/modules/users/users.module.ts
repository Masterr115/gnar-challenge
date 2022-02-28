import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../models/users.entity';
import { UsersCreateService } from '../../services/users/users.create.service';
import { UsersFindService } from '../../services/users/users.find.service';
import { UsersUpdateService } from '../../services/users/users.update.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersCreateService, UsersUpdateService, UsersFindService],
  exports: [UsersCreateService, UsersUpdateService, UsersFindService],
})
export class UsersModule {}
