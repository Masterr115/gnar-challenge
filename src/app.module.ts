import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { ormConfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: ormConfig }), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
