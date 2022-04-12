import { Body, Controller, Delete, Get, ImATeapotException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UnprocessableEntityException } from '@nestjs/common';
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
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Post()
  async createTask(
    @Body() 
    createTaskDto: CreateTaskDto) {
      try {
        const task = new Task();
        Object.assign(task, createTaskDto);
        return await this.tasksService.createTask(task);
      } catch (error) {
        throw new UnprocessableEntityException(error);
      }
  }

  @Get(':rowKey')
  async getTaskByRowKey(@Param('rowKey') rowKey: string) {
    try {
      return await this.tasksService.findTaskByRowKey(rowKey, new Task());
    } catch (error) {
      throw new NotFoundException(error);
    }
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

  @Patch(':rowKey')
  async updateTaskByRowKey(
    @Param('rowKey') rowKey: string,
    @Body() taskData: Partial<CreateTaskDto>
  )
  {
    try {
      const task = new Task();
      Object.assign(task, taskData);
      return await this.tasksService.updateTaskByRowKey(rowKey, task);
    } catch (error) {
      throw new UnprocessableEntityException(error);
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
