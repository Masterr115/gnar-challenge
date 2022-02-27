import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ormConfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: ormConfig }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
