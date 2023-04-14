import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { omitUndefined } from '@libs/core/helpers/objectUtils';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

  async find(obj?: { id?: string; userId?: string }): Promise<Todo[]> {
    return this.todoModel.findAll({ where: { ...omitUndefined(obj) } });
  }

  async create(todo: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(todo);
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    await this.todoModel.update(todo, { where: { id } });
    return this.todoModel.findByPk(id);
  }

  async delete(id: number): Promise<number> {
    return this.todoModel.destroy({ where: { id } });
  }
}
