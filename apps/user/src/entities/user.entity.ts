import { Todo } from '@apps/todo/entities/todo.entity';
import { InferAttributes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Token } from './token.entity';

@Table({ modelName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Todo)
  todos: Todo[];

  @HasMany(() => Token)
  tokens: Token[];

  toJSON() {
    const { password, ...rest } = this.get();
    return rest;
  }
}

export type UserAttributes = InferAttributes<User>;
