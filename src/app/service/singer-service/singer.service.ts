import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Singer} from '../../model/Singer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingerService {
//API LOCAL
  private API_SINGER = environment.API_LOCAL+'singer';
  //API SERVER
  // private API_SINGER = environment.API_SERVER+'singer';
  constructor(private http: HttpClient) { }
  createSinger(singer: Singer): Observable<Singer>{
    console.log('goi service singer');
    return this.http.post<Singer>(this.API_SINGER, singer)
  }
  listSinger(): Observable<Singer[]>{
    return this.http.get<Singer[]>(this.API_SINGER+'/list')
  }
}
