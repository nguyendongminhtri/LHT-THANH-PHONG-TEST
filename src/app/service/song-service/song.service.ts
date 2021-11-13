import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Song} from '../../model/Song';
import {Observable} from 'rxjs';
import {SongDetail} from '../../model/SongDetail';
import {LikeSong} from '../../model/LikeSong';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  //API_LOCAL
  private API_SONG = environment.API_LOCAL+'song';
  //API_SERVER
  // private API_SONG = environment.API_SERVER+'song';
  constructor(private http: HttpClient) { }
  createSong(song: Song): Observable<Song>{
    return this.http.post<Song>(this.API_SONG, song);
  }
  pageSong(nextPage){
    console.log('goi service');
    console.log('API -> ',this.API_SONG);
    const params = nextPage;
    return this.http.get(this.API_SONG, {params})
  }
  detailSong(id: number): Observable<SongDetail>{
    return this.http.get<SongDetail>(this.API_SONG+'/'+id)
  }
  likeSong(id: number){
    return this.http.get(this.API_SONG+'/like/'+id );
  }
}
