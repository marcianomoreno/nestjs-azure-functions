import { Body, Controller, Delete, Get, ImATeapotException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
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
  createTask(@Body() body: CreateTaskDto): Task {
    console.log("createTask", body);
    return this.tasksService.createTask(body);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Task {
    try {
      const task = this.tasksService.getTaskById(id);
      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return task;
    } catch (e) {
      console.log(e);
      throw new ImATeapotException(e);
    }
  }

  @Patch(':id')
  updateTaskById(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<CreateTaskDto>): Task {
    return this.tasksService.updateTaskById(id, body);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.deleteTaskById(id);
  }
}
