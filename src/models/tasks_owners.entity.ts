import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TasksEntity } from './tasks.entity';
import { UsersEntity } from './users.entity';

@Entity('tasks_owners')
export class TasksOwnersEntity {
  @PrimaryGeneratedColumn('uuid')
  idTaskOwner: string;

  @Column()
  idUser: string;

  @ManyToOne(() => UsersEntity, (user) => user.idUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' })
  ownerUser: UsersEntity;

  @Column()
  idTask: string;

  @ManyToOne(() => TasksEntity, (task) => task.idTask, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idTask' })
  post: TasksEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @BeforeInsert()
  updateEntity() {
    this.createdAt = new Date();
  }
}
