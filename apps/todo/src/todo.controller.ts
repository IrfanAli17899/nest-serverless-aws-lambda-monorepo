import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { User } from '@libs/core/decorators/user.decorator';
import { AuthedOnly } from '@libs/core/guards/auth.guard';
import { UserAttributes } from '@apps/user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @AuthedOnly()
  getUserTodos(@User() user: UserAttributes) {
    return this.todoService.find({ userId: user.id });
  }

  @Post()
  @AuthedOnly()
  createUserTodo(@Body() obj: CreateTodoDto, @User() user: UserAttributes) {
    return this.todoService.create({ ...obj, userId: user.id });
  }
}
