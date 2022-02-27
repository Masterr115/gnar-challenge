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
import { PostsEntity } from './posts.entity';
import { UsersEntity } from './users.entity';

@Entity('posts_owners')
export class PostsOwnersEntity {
  @PrimaryGeneratedColumn('uuid')
  idPostOwner: string;

  @Column()
  idUser: string;

  @ManyToOne(() => UsersEntity, (user) => user.idUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' })
  ownerUser: UsersEntity;

  @Column()
  idPost: string;

  @ManyToOne(() => PostsEntity, (post) => post.idPost, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPost' })
  post: PostsEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @BeforeInsert()
  updateEntity() {
    this.createdAt = new Date();
  }
}
