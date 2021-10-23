import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category-service/category.service';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {SingerService} from '../../../service/singer-service/singer.service';
import {Singer} from '../../../model/Singer';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})

export class CreateSongComponent implements OnInit {
  //TEST SINGER
  singers = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  form: any = {}
  categoryControl = new FormControl('', Validators.required);
  // selectFormControl = new FormControl('', Validators.required);
  listCTGS: Category[] = [];
  listSinger: Singer[] = [];
  song: Song;
  success: any = {
    message: "yes"
  }
  error1: any = {
    message: "no_avatar"
  }
  error3: any = {
    message: "no_category"
  }
  error2: any = {
    message: "no_mp3Url"
  }
  status = 'Please fill in the form to create Song'
  constructor(private categoryService: CategoryService,
              private songService: SongService,
              private singerService: SingerService) { }

  ngOnInit(): void {
     this.categoryService.getListCategory().subscribe(listCTG =>{
       this.listCTGS = listCTG;
       console.log('listCTG -> ',this.listCTGS);
     })
    this.singerService.listSinger().subscribe(listSinger=>{
      this.listSinger = listSinger;
      console.log('listSinger =>', this.listSinger);
    })
  }
  onSubmit(){
    console.log('this.form.category == ', this.form.category);
    this.song = new Song(
      this.form.nameSong,
      this.form.lyrics,
      this.form.avatarSong,
      this.form.mp3Url,
      this.form.category,
      this.form.singerList
    )
    this.songService.createSong(this.song).subscribe(data =>{
      console.log('data === ',data);
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'Please upload Avatar';
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'Please upload File Mp3';
      }
      if(JSON.stringify(data)==JSON.stringify(this.error3)){
        this.status = 'Please select Category';
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create Song success!'
      }

    })
  }
  onChangeAvatar($event){
    this.form.avatarSong = $event;
  }
  onChangeFileMp3($event){
    this.form.mp3Url = $event;
  }
}

