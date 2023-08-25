import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs'
import {readParse, createID } from '../utils/utils'

@Injectable()
export class SongsService {

    private songs = join(__dirname, '../../data/songs.json')

    getAll(){
        try {
            return readParse();
        } catch (error) {
            throw new Error('Cannot get data')
        }
    }

    async create(song: any){
        try {
            const newPista = {id: createID(), ...song};
            console.log(newPista);
            const data = readParse();
            data.push(newPista);
            fs.writeFileSync(this.songs, JSON.stringify(data, null, 2))
            return {message: "song created", data: newPista, success: true}
        } catch (error) {
            throw new Error("Created failed");
        }
    }

    deleteSongById(id: string): {success: boolean, message: string}{
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
        return {success: true, message: `Song with id: ${id}, was deleted`}
    } else {
        return {success: false, message: `Song with id: ${id}, was not found`}
    }
} catch (error) {
    throw new Error(`Delete Failed`)
}
    }

    updateSongById(id: number, body: any): {success: boolean, message: string, data?: any}{
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
        return {success: true, message: `Song with id: ${id}, was edited`, data: editedSong}
    } return {success: false, message: `Song with id: ${id}, was not found`};
} catch (error) {
    throw new Error(`Update Failed`)
}
    }

    getById(id: number) : {data?: any, success: boolean, message: string}{
        try {
            const data = readParse();
            //buscamos indice de la cancion que buscamos a traves del id
            const index = data.findIndex((song: { id: number; }) => song.id === id);
            if(index >= 0){
                //returnamos la cancion si la encuentra en : data[index]
                return {success: true, message: 'Song found', data: data[index]}
            } else return {success: false, message: 'Song not found'}
        } catch (error) {
            throw new Error("Error getting song");
        }
    }
}