import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/category-service/category.service';
import {Category} from '../../../model/Category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  form: any = {};
  status = 'Please fill in the form to create category';
  category: Category;
  error1: any = {
    message: 'no_name_category'
  };
  error2: any = {
    message: 'no_avatar_category'
  };
  success: any = {
    message: 'yes'
  };
checkUploadAvatar = false;
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }
ngSubmit(){
    this.category = new Category(
      this.form.nameCategory,
      this.form.avatarCategory
    )
  this.categoryService.createCategory(this.category).subscribe(data =>{
    console.log('data category = ',data);
    if(JSON.stringify(data)==JSON.stringify(this.error1)){
      this.status = 'The name Category existed! Please try again!'
    }
    if(JSON.stringify(data)==JSON.stringify(this.error2)){
      this.status = 'The Avatar Category is required! Please try again!'
    }
    if(JSON.stringify(data)==JSON.stringify(this.success)){
      this.status = 'Create success!'
    }
  })
}
  onChangeAvatar($event) {
    this.checkUploadAvatar = true;
    this.form.avatarCategory = $event;
  }
}
