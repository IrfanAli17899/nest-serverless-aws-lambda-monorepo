import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CoreModule } from '@libs/core/core.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@apps/user/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { Token } from '@apps/user/entities/token.entity';

@Module({
  imports: [CoreModule, SequelizeModule.forFeature([Todo, User, Token])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
