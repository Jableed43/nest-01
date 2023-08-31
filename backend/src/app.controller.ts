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
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { SongService } from './songs/song.service';
import { Song, BodySong } from './songs/song.interface';

@Controller('songs')
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  async getAll(@Res() res: Response): Promise<Response<Song[]>> {
    try {
      const serviceResponse = await this.songService.getAll();
      //returna estado 200 y envia todos los registros
      return res.status(HttpStatus.OK).send(serviceResponse);
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<Song>> {
    try {
      const parsedID = parseInt(id, 10);
      const serviceResponse = await this.songService.getById(parsedID);
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
  async create(@Body() song: BodySong, @Res() res: Response): Promise<any> {
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
  async updateSongById(
    @Param('id') id: string,
    @Body() body: Song,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const parsedID = parseInt(id, 10);
      const success = await this.songService.updateSongById(parsedID, body);

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
