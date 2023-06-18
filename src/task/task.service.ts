import { Delete, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {

  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: "some task",
      status: TaskStatus.PENDING
    }
  ];


  getAllTask() {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.DONE
    }
    this.tasks.push();

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  updateTask(id: string, updateFields: UpdateTaskDto): Task {
    const task = this.getTaskById(id) //Obtener id
    const newTask = Object.assign(task, updateFields) // Combinar datos por ende actualiza
    this.tasks = this.tasks.map(task => task.id == id ? newTask : task) // Recorrer y actualizar (siempre actualiza)
    
    return newTask;
  }

  deleteTask(id: string){
    this.tasks =  this.tasks.filter(task => task.id !== id)
  }

}
