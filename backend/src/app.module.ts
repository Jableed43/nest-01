import { Module } from '@nestjs/common';
import { SongController } from './app.controller';
import { SongService } from './songs/song.service';

@Module({
  imports: [],
  controllers: [SongController],
  providers: [SongService],
})
export class AppModule {}