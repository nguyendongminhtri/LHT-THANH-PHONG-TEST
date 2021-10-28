import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/Category';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.scss']
})
export class PageSongComponent implements OnInit {
  totalElements: number = 0;
  categorys: Category[];
  // loading: boolean;
  searchText;
  constructor(private songService: SongService) { }

  ngOnInit(): void {
  }
  private getListResquest(nextPage) {
    // this.loading = true;
    this.songService.pageSong(nextPage)
      .subscribe(data => {
          this.categorys = data['content'];
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
