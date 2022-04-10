import { Injectable, Post } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [ { id:0, name: 'Task 1' }, { id:1, name: 'Task 2' }, {id: 2, name: 'Task 3' } ];

  getHello(): string {
    return "Hello tasks!";
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}
