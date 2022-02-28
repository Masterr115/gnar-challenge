import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TasksChildrenEntity } from './tasks_children.entity';
import { TasksOwnersEntity } from './tasks_owners.entity';
import { UsersEntity } from './users.entity';

export enum StatusEnum {
  TODO = 'to_do',
  DOING = 'doing',
  DONE = 'done',
}

@Entity('tasks')
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  idTask: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.TODO })
  status: StatusEnum;

  @Column()
  idRequester: string;

  @ManyToOne(() => UsersEntity, (user) => user.idUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idRequester' })
  userRequester: UsersEntity;

  @Column('timestamp')
  due_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @BeforeInsert()
  updateEntity() {
    this.createdAt = new Date();
  }

  @OneToMany(() => TasksOwnersEntity, (postOwner) => postOwner.post)
  owners: TasksOwnersEntity[];

  @OneToMany(() => TasksChildrenEntity, (TasksChild) => TasksChild.taskParent)
  children: TasksChildrenEntity[];

  @OneToOne(() => TasksChildrenEntity, (TasksChild) => TasksChild.taskChild)
  parent: TasksChildrenEntity;
}
