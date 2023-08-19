import { Controller, Get, Res, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { Response } from 'express';
import {SongsService} from './songs/songs.service'

@Controller('songs')
export class SongsController {

  constructor(private songsService: SongsService){}

  @Get()
  getAll(@Res() res: Response ){
   res.send({data: this.songsService.getAll(), success: true, code:200})
  }

  @Post()
  create(@Body() song: any){
   const newSong = this.songsService.create(song)
   return {
    message: 'Data saved',
    song: song,
    success: true,
    code: 201,
    data: newSong
  }
  }
  
  @Delete(':id')
  deleteSongById(@Param('id') id: string){
    const deletedSuccess = this.songsService.deleteSongById(id);
    if(deletedSuccess){
      return {
        message: 'Song deleted',
        success: true,
        code: 200
      } 
    } else {
        return {
          message: 'Error',
          success: false,
          code: 400
      }
    }
  }

  //path param
  @Put(':id')
  updateSongById(@Param('id') id: string, @Body() body: any){
    try {
      const parsedID = parseInt(id, 10);
      const editSuccess = this.songsService.updateSongById(parsedID, body);
    if(editSuccess){
      return {
        message: 'Song edited',
        success: true,
        code: 200,
        data: editSuccess
      } 
    } else {
        return {
          message: 'Error',
          success: false,
          code: 400
      }
    }
    } catch (error) {
      throw new Error(`Update failed`)
    }
  }
}