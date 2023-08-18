import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs'
import {readParse, createID } from '../utils/utils'

@Injectable()
export class SongsService {

    private songs = join(__dirname, '../../data/songs.json')

    getAll(){
        return readParse();
    }

    async create(song: any){
        try {
            const newPista = {id: createID(), ...song};
            console.log(newPista);
            const data = readParse();
            data.push(newPista);
            fs.writeFileSync(this.songs, JSON.stringify(data, null, 2))
        } catch (error) {
            console.log(error);
        }
    }


}
