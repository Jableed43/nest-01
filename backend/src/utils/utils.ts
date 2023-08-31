import * as fs from 'fs'
import {join} from 'path'

export function readParse(){
    const songs = join(__dirname, '../../data/songs.json')
    const fileContent = fs.readFileSync(songs, 'utf-8');
    console.log(fileContent);
    return JSON.parse(fileContent);
}

export function createID(){
    const songs = readParse();
    //esto es un registro
    const lastTrack = songs[songs.length - 1];
    //obtengo el valor del id del ultimo registro + 1
    const id = lastTrack.id + 1;
    return id;
}
