import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { Profile } from './users/profile.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //Es tan solo para conectarse
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //Sincronizar las tablas
      synchronize: true
    }),
    TaskModule,
    UsersModule,
    PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
