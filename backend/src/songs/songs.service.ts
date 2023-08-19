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
            return data
        } catch (error) {
            throw new Error("Created failed");
        }
    }

    deleteSongById(id: string){
try {
    //traer los datos
    const data = readParse();
    //buscar ubicacion del dato a borrar
    const songFound = data.findIndex((song: { id: number; }) => song.id === Number(id))
    //verificar si encontró el song
    if(songFound >= 0){
        //splice(starter, deleteCount) - borra el registro
        data.splice(songFound, 1)
        //guardar el array de songs en el archivo json
        fs.writeFileSync(this.songs, JSON.stringify(data, null, 2))
        return true;
    } else {
        return false;
    }
} catch (error) {
    throw new Error(`Delete Failed`)
}
    }

    updateSongById(id: number, body: any){
try {
    const data = readParse();
    const index = data.findIndex((song : {id : number}) => song.id === id )
    if(index >= 0){
        //sobreescribimos en el registro a editar la data que nos llega
        //si se repiten campos el ultimo escrito es el que prevalece
        const editedSong = {...data[index], ...body, id}
        //guardamos en el registro lo editado
        data[index] = editedSong
        fs.writeFileSync(this.songs, JSON.stringify(data, null, 2))
        return editedSong;
    } return null;
} catch (error) {
    throw new Error(`Update Failed`)
}
    }
}