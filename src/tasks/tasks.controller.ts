import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get('hello')
  getHello(): string {
    return this.tasksService.getHello();
  }

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() body: CreateTaskDto ): Task {
    console.log("createTask", body);
    return this.tasksService.createTask(body);
  }
}
