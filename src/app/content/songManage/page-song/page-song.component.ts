import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/Category';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song-service/song.service';
import {Song} from '../../../model/Song';

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.scss']
})
export class PageSongComponent implements OnInit {
  totalElements: number = 0;
  songs: Song[];
  // loading: boolean;
  searchText;
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getListResquest({page: 0, size: 90})

  }
  private getListResquest(nextPage) {
    console.log('Goi ham page Song');
    // this.loading = true;
    this.songService.pageSong(nextPage)
      .subscribe(data => {
          console.log('song tren == ', data);
          this.songs = data['content'];
          console.log('song duoi == ', data);
          this.totalElements = data['totalElements'];
          // this.loading = false;
        }
        // , error => {
        //   // this.loading = false;
        // }
      );
  }
  nextPage(event: PageEvent) {
    const nextPage = {};
    nextPage['page'] = event.pageIndex.toString();
    nextPage['size'] = event.pageSize.toString();
    this.getListResquest(nextPage);
  }
}
