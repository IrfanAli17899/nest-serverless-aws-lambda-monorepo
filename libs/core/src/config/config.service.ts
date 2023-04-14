import { Injectable } from '@nestjs/common';
import { ConfigService as EnvService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class ConfigService {
  constructor(private envsService: EnvService) {}
  readonly jwtSalt = 'some-salt';

  readonly databaseConfig: Readonly<SequelizeModuleOptions> = {
    dialect: 'postgres',
    host: this.envsService.get('DATABASE_HOST'),
    port: this.envsService.get('DATABASE_PORT'),
    database: this.envsService.get('DATABASE_NAME'),
    username: this.envsService.get('DATABASE_USERNAME'),
    password: this.envsService.get('DATABASE_PASSWORD'),
    autoLoadModels: true,
    synchronize: true,

    // sync: { force: true },
  };
}
