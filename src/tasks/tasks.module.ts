import { AzureTableStorageModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';


@Module({
  imports: [AzureTableStorageModule.forFeature(Task, {table: 'tasks', createIfNotExists: true})],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
