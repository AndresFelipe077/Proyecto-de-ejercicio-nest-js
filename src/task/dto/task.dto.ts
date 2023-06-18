import { TaskStatus } from "../task.entity";
import { IsString, IsNotEmpty, MinLength, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  description: string;
  // status: TaskStatus;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn([ TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  status?: TaskStatus;
}