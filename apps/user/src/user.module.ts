import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreModule } from '@libs/core/core.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';
import { Todo } from '@apps/todo/entities/todo.entity';

@Module({
  imports: [CoreModule, SequelizeModule.forFeature([User, Token, Todo])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
