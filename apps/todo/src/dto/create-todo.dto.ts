import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateTodoDto {
  @JoiSchema(joi.string().required())
  title: string;

  @JoiSchema(joi.string().required())
  description: string;

  userId?: string;
}
