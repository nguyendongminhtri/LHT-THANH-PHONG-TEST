import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category-service/category.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnInit {
  totalElements: number = 0;
  categorys: Category[];
  loading: boolean;
  searchText;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getListResquest({page: '', size: 3});
  }
  private getListResquest(request) {
    this.loading = true;
    this.categoryService.getPageCategory(request)
      .subscribe(data => {
        this.categorys = data['content'];
        console.log('category', data);
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
  }
}
