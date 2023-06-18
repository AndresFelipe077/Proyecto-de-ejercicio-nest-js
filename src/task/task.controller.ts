import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {

  constructor(
    private taskService: TaskService
  ) {}

  @Get()
  helloWorld(){
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto){
    // console.log(newTask);
    // return 'guardando';
    this.taskService.createTask(newTask.title, newTask.description);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id)
  }

  @Patch(':id')
  updateTask(@Param("id") id: string, @Body() updatedFields: UpdateTaskDto) {
    return this.taskService.updateTask(id, updatedFields)
  }

}
