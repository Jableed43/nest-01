import { Module } from '@nestjs/common';
import { SongsController } from './app.controller';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [],
})
export class AppModule {}