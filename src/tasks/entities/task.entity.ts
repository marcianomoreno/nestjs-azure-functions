import { EntityInt32, EntityPartitionKey, EntityRowKey, EntityString } from '@nestjs/azure-database';

@EntityPartitionKey('TaskId')
@EntityRowKey('TaskName')
export class Task {
  @EntityInt32() id: number;
  @EntityString() name: string;
}