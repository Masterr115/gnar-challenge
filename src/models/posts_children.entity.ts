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

@Entity('posts_children')
export class PostsChildrenEntity {
  @PrimaryGeneratedColumn('uuid')
  idPostChildren: string;

  @Column()
  idPostChild: string;

  @ManyToOne(() => PostsEntity, (post) => post.idPost, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPostChild' })
  postChild: PostsEntity;

  @Column()
  idPostParent: string;

  @ManyToOne(() => PostsEntity, (post) => post.idPost, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPostParent' })
  postParent: PostsEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @BeforeInsert()
  updateEntity() {
    this.createdAt = new Date();
  }
}
