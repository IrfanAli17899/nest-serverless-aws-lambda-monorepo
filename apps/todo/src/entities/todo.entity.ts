import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { User } from '@apps/user/entities/user.entity';
import { InferAttributes } from 'sequelize';

@Table({ modelName: 'todos' })
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;
}

export type TodoAttributes = InferAttributes<Todo>;
