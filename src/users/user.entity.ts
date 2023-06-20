import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Profile } from "./profile.entity";
import { Post } from "src/post/entities/post.entity";

@Entity({ name:'users' }) //Aqui se definie el nombre de la bd
export class User { // si no se define el name de bd se asigna por default como este el modelo en este caso "users"

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({ type:'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({nullable: true})
  authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile


  @OneToMany(() => Post, post => post.author)
  posts: Post[]

}