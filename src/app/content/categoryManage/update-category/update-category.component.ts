import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category-service/category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  // @ts-ignore
  category: Category = new Category();
  errorMessage = '';
  error1: any = {
    message: "no_name_category"
  };
  success: any = {
    message: "yes"
  };
  addAvatar = false;
  constructor(private categoryService: CategoryService,
              private routes: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId =>{
      const id = +categoryId.get('id');
      console.log('id = ', id);
      this.categoryService.getCategoryById(id).subscribe(result=>{
        this.category = result;
        console.log('category -->', this.category);
      })
    })
  }

  updateCategory() {
    console.log('nameCategory == ', this.category.nameCategory);
    this.categoryService.updateCategory(this.category.id, this.category).subscribe(data => {
      console.log('data update --> ',data);
      if (JSON.stringify(data) == JSON.stringify(this.error1)) {
        this.errorMessage = 'The name Category is existed! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.success)) {
        this.errorMessage = 'Update success!';
      }
    }, error => {
      alert('Please login before update!')
    });
  }
  onAvatar($event) {
    console.log('vao day');
    this.addAvatar = true;
    this.category.avatarCategory = $event;
  }
}
