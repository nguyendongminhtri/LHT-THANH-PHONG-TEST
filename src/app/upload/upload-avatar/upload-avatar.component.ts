import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  selectedFile: File;
  listIMG: Array<string> = [];
  myMap = new Map();
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  //Khi upload file qua the input dưới dạng 1 hoặc nhiều file thì tệp đó thông qua sự kiện (change)$event được kích hoạt. Và tất cả file upload sẽ lưu trữ
  //trong $event.target.files
  onFileChaged($event){
    this.selectedFile = $event.target.files[0];
    this.onUpLoad()


  }
  onUpLoad(){
    this.checkUploadAvatar = true;
    const id = Math.random().toString(36).substring(2) //Tạo ra 1 cái name riêng để hiển thị trên DB của FB
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); //Tra ve  1 cai chuoi sieu van ban luu tren FB
      })
      .then(downloadURL => { //cHUYEN Value tu component cha sang con
        this.downloadURL = downloadURL;
        this.giveURLtoCreate.emit(this.downloadURL);
        this.checkUploadAvatar = false;
        this.listIMG.push(downloadURL)
        console.log('LIST ==> ', this.listIMG);
        for(let i=0; i<this.listIMG.length;i++){
       this.myMap.set(i,this.listIMG[i])
        }
        console.log('map ---> ',this.myMap);
        return downloadURL;
      })
      .catch(error=>{
        console.log(`Failed to upload avatar and get link ${error}`);
      })
  }
}
