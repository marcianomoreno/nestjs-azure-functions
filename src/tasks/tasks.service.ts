import { AzureTableStorageResultList, InjectRepository, Repository } from '@nestjs/azure-database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}
  private tasks: Task[] = [ { id:1, name: 'Task 1' }, { id:2, name: 'Task 2' }, {id: 3, name: 'Task 3' } ];

  getHello(): string {
    return "Hello tasks!";
  }

  async getTasks(): Promise<AzureTableStorageResultList<Task>> {
    return this.tasksRepository.findAll();
  }

  async createTask(task: Task): Promise<Task> {
    return this.tasksRepository.create(task);
  }

  async findTaskByRowKey(rowKey: string, task: Task):Promise<Task> {
    return this.tasksRepository.find(rowKey, task);
  }

  getTaskById(id: number): Task {
    return this.tasks.find(task => task.id === id);
  }

  async updateTaskByRowKey(rowKey: string, task: Partial<Task>): Promise<Task> {
    return this.tasksRepository.update(rowKey, task)
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
