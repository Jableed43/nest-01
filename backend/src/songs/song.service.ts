import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { readParse, createID } from '../utils/utils';
const BASE_URL = 'http://localhost:3030/songs/';
import { Song, BodySong } from './song.interface';

@Injectable()
export class SongService {
  private songs = join(__dirname, '../../data/songs.json');

  async getAll(): Promise<Song[]> {
    const res = await fetch(BASE_URL);
    const parsed = res.json();
    return parsed;
  }

  async getById(id: number): Promise<Song> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    return parsed;
  }

  async create(song: BodySong): Promise<any> {
    try {
      const id = await this.setId();
      const { title, duration, artist } = song;
      const newSong = { id, title, duration, artist };
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });
      const parsed = res.json();
      return parsed;
    } catch (error) {
      throw new Error('Song creation failed');
    }
  }

  async deleteSongById(id: number): Promise<any> {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete song');
    }

    const parsed = await res.json();
    console.log('parsed:', parsed);
    return parsed;
  }

  async updateSongById(id: number, body: Song): Promise<boolean> {
    const isTrack = await this.getById(id);

    if (!Object.keys(isTrack).length) {
      return false;
    }

    const updatedTrack = {
      title: body.title,
      duration: body.duration,
      artist: body.artist,
    };

    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTrack),
    });

    if (!res.ok) {
      throw new Error('Failed to update song');
    }

    return true;
  }

  private async setId(): Promise<number> {
    const tracks = await this.getAll();
    const id = tracks.pop().id + 1;
    return id;
  }
}
