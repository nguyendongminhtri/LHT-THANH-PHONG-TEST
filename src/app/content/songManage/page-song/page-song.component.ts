import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/Category';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song.service';
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
  }
  private getListResquest(nextPage) {
    // this.loading = true;
    this.songService.pageSong(nextPage)
      .subscribe(data => {
          this.songs = data['content'];
          console.log('category', data);
          this.totalElements = data['totalElements'];
          // this.loading = false;
        }
        // , error => {
        //   // this.loading = false;
        // }
      );
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
  }
}
