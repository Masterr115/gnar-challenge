import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostsChildrenEntity } from './posts_children.entity';
import { PostsOwnersEntity } from './posts_owners.entity';
import { UsersEntity } from './users.entity';

export enum StatusEnum {
  TODO = 'to_do',
  DOING = 'doing',
  DONE = 'done',
}

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  idPost: string;

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

  @OneToMany(() => PostsOwnersEntity, (postOwner) => postOwner.post)
  owners: PostsOwnersEntity[];

  @OneToMany(() => PostsChildrenEntity, (postsChild) => postsChild.postParent)
  children: PostsChildrenEntity[];
}
