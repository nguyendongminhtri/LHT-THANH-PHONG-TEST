import { Component, OnInit } from '@angular/core';
import {Singer} from '../../../model/Singer';
import {SingerService} from '../../../service/singer-service/singer.service';

@Component({
  selector: 'app-create-singer',
  templateUrl: './create-singer.component.html',
  styleUrls: ['./create-singer.component.scss']
})
export class CreateSingerComponent implements OnInit {
  form: any = {};
  singer: Singer;
  status = 'Please fill in the form to create Singer!'
  constructor(private singerService: SingerService) { }
  success: any = {
    message: "yes"
}
  ngOnInit(): void {
  }
  ngSubmit(){
  this.singer = new Singer(
    this.form.nameSinger,
    this.form.birthDay,
    this.form.description,
    this.form.avatarSinger,
  )
    console.log('singer === ', this.singer);
    this.singerService.createSinger(this.singer).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.success)){
          this.status = 'Create Singer Success!'
      }
    })
  }
  onChangeAvatar($event){
    this.form.avatarSinger = $event;
  }

}
