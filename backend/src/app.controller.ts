import { Controller, Get, Res, Post, Delete, Put, Body } from '@nestjs/common';
import { Response } from 'express';
import {SongsService} from './songs/songs.service'

@Controller('songs')
export class SongsController {

  constructor(private songsService: SongsService){}

  @Get()
  getAll(@Res() res: Response ){
   res.send({data: this.songsService.getAll(), status: true, code:200})
  }

  @Post()
  create(@Body() song: any){
   this.songsService.create(song)
   return {message: 'Data saved', song: song, status: true, code: 201}
  }

  @Delete()
  deleteSongs(){
   return 'registro eliminado'
  }

  @Put()
  putSongs(){
   return 'registro modificado'
  }
}
