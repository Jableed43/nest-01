import {
  Controller,
  Get,
  Res,
  Post,
  Delete,
  Put,
  Body,
  Param,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ValidationPipe,
  UsePipes 
} from '@nestjs/common';
import { Response } from 'express';
import { SongService } from './songs/song.service';
import { Song } from './songs/song.interface';
import {songDto} from './songs/song.dto'
import {song_idDTO} from './songs/song_id.dto'
@Controller('songs')
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  async getAll(@Res() res: Response): Promise<Response<song_idDTO[]>> {
    try {
      const serviceResponse = await this.songService.getAll();
      //retorna estado 200 y envia todos los registros
      return res.status(HttpStatus.OK).send(serviceResponse);
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  @Get(':id')
  async getById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<Song>> {
    try {
      const serviceResponse = await this.songService.getById(id);
      //si la respuesta del servicio da true, entonces ingresa por ese lado
      if (Object.keys(serviceResponse).length) {
        return res.status(HttpStatus.OK).send(serviceResponse);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'song not found' });
      }
    } catch (error) {
      throw new BadRequestException(`Cannot get song with id ${id}`);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() song: songDto, @Res() res: Response): Promise<any> {
    try {
      await this.songService.create(song);
      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      throw new BadRequestException('Song creation failed');
    }
  }

  @Delete(':id')
  async deleteSongById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const serviceResponse = await this.songService.deleteSongById(id);

      if (serviceResponse) {
        return res.status(HttpStatus.OK).send(serviceResponse);
      } else {
        return res.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (error) {
      throw new NotFoundException('Delete failed');
    }
  }

  //path param
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSongById(
    @Param('id') id: number,
    @Body() body: songDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const success = await this.songService.updateSongById(id, body);

      const statusCode = success ? HttpStatus.OK : HttpStatus.NOT_FOUND;

      return res.status(statusCode).send({
        success,
        code: statusCode,
      });
    } catch (error) {
      throw new BadRequestException(`Update failed`);
    }
  }
}