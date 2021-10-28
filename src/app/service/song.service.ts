import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Song} from '../model/Song';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  //API_LOCAL
  // private API_SONG = environment.API_LOCAL+'song';
  //API_SERVER
  private API_SONG = environment.API_SERVER+'song';
  constructor(private http: HttpClient) { }
  createSong(song: Song): Observable<Song>{
    return this.http.post<Song>(this.API_SONG, song);
  }
}
