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

@Entity('tasks_children')
export class TasksChildrenEntity {
  @PrimaryGeneratedColumn('uuid')
  idTaskChildren: string;

  @Column()
  idTaskChild: string;

  @ManyToOne(() => TasksEntity, (task) => task.idTask, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idTaskChild' })
  taskChild: TasksEntity;

  @Column()
  idTaskParent: string;

  @ManyToOne(() => TasksEntity, (task) => task.idTask, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idTaskParent' })
  taskParent: TasksEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @BeforeInsert()
  updateEntity() {
    this.createdAt = new Date();
  }
}
