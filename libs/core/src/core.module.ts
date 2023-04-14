import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { ConfigModule as EnvModule } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [EnvModule.forRoot(), ConfigModule, DatabaseModule, JoiPipeModule],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
