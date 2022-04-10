import { Injectable } from '@nestjs/common';
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
    const newTask: Task = {id: this.tasks.length + 1, ...createTaskDto};
    this.tasks.push(newTask);
    return newTask;
  }

}
