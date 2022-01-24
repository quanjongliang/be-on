import { BaseEntity } from 'src/common';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '.';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  content: string;
  @Column({ nullable: true })
  avatarUrl: string;
  @Column({ nullable: true })
  avatarKey: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
