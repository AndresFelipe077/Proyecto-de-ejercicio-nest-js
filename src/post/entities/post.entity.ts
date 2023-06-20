import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titile: string;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, user => user.posts)
  author: User;

}
