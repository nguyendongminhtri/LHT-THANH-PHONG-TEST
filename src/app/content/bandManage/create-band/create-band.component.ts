import {Component, OnInit} from '@angular/core';
import {Band} from '../../../model/Band';
import {BandService} from '../../../service/band-service/band.service';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.scss']
})
export class CreateBandComponent implements OnInit {
  form: any = {};
  status = 'Please fill in the form to create Band!';
  band: Band;
  error: any = {
    message: 'no_avatar_band'
  };
  success: any = {
    message: "create_success"
  };

  constructor(private bandService: BandService) {
  }

  ngOnInit(): void {
  }

  onUploadAvatar($event: string) {
    this.form.avatarBand = $event;
  }

  ngSubmit() {
    this.band = new Band(
      this.form.nameBand,
      this.form.avatarBand,
      this.form.description
    );
    this.bandService.createBand(this.band).subscribe(data => {
      console.log('data -> ',data);
        if(JSON.stringify(data)==JSON.stringify(this.error)){
          this.status = 'Please upload avatar!'
        }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create success!'
      }
    });
  }
}
