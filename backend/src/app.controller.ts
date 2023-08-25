import { Controller, Get, Res, Post, Delete, Put, Body, Param, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import {SongsService} from './songs/songs.service'

@Controller('songs')
export class SongsController {

  constructor(private songsService: SongsService){}

  @Get()
  getAll(@Res() res: Response ){
 try {
  const serviceResponse = this.songsService.getAll();
  //returna estado 200 y envia todos los registros
  return res.status(HttpStatus.OK).send(serviceResponse)
 } catch (error) {
  throw new NotFoundException('Data not found')
 }
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() res: Response ){
  try {
    const parsedID = parseInt(id, 10);
    const serviceResponse = this.songsService.getById(parsedID);
    //si la respuesta del servicio da true, entonces ingresa por ese lado
    if(serviceResponse.success){
      return res.status(HttpStatus.OK).send(serviceResponse)
    } else {
      return res.status(HttpStatus.NOT_FOUND).send(serviceResponse)
    }
  } catch (error) {
    throw new BadRequestException(`Cannot get song with id ${id}`)
  }
  }

  @Post()
  create(@Body() song: any, @Res() res: Response){
try {
  this.songsService.create(song)
  //retorna codigo 201, created no retorna datos
  return res.status(HttpStatus.CREATED)
} catch (error) {
  throw new BadRequestException('Song creation failed')
}
  }
  
  @Delete(':id')
  deleteSongById(@Param('id') id: string, @Res() res: Response){
    try {
      const serviceResponse = this.songsService.deleteSongById(id);
      // en ...serviceResponse tomamos los datos que se encuentran dentro del retorno
      if(serviceResponse.success){
        return res.status(HttpStatus.OK).send({...serviceResponse})
      }
      else {
        return res.status(HttpStatus.NOT_FOUND).send({...serviceResponse})
      }
      
    } catch (error) {
      throw new NotFoundException('Delete failed')
    }
  }

  //path param
  @Put(':id')
  updateSongById(@Param('id') id: string, @Body() body: any, @Res() res: Response){
    try {
      const parsedID = parseInt(id, 10);
      const serviceResponse = this.songsService.updateSongById(parsedID, body);
      if(serviceResponse.success){
        //es importante usar el spread operator para traer los datos del objeto de la respuesta
        return res.status(HttpStatus.OK).send({...serviceResponse, code: HttpStatus.OK})
      } else {
        return res.status(HttpStatus.NOT_FOUND).send({...serviceResponse, code: HttpStatus.NOT_FOUND})
      }
    } catch (error) {
      throw new BadRequestException(`Update failed`)
    }
  }
}