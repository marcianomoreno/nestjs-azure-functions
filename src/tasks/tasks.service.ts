import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [ { id:1, name: 'Task 1' }, { id:2, name: 'Task 2' }, {id: 3, name: 'Task 3' } ];

  getHello(): string {
    return "Hello tasks!";
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {id: this.tasks.length + 1, name: createTaskDto.name};
    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(id: number): Task {
    return this.tasks.find(task => task.id === id);
  }

  updateTaskById(id: number, createTaskDto: Partial<CreateTaskDto>): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    task.name = createTaskDto.name;
    return task;
  }

  deleteTaskById(id: number): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks = this.tasks.filter(task => task.id !== id);
    return task;
  }
}
