import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '../config/config.service';
// import { writeFileSync } from 'fs';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // writeFileSync(
        //   'src/database/config.json',
        //   JSON.stringify(configService.databaseConfig),
        // );
        return configService.databaseConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
