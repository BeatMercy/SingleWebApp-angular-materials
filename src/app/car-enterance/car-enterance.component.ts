import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { JwtService } from '../jwt.service';
import { MessageDialogService } from '../message-dialog.service';
import { ImageCompressService, ResizeOptions, ImageUtilityService } from 'ng2-image-compress';
import { AuthGuardService } from '../auth-guard.service';
const URL = '/car/enter';

@Component({
  selector: 'app-car-enterance',
  templateUrl: './car-enterance.component.html',
  styleUrls: ['./car-enterance.component.css']
})
export class CarEnteranceComponent implements OnInit {
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  constructor(
    public authGuardService: AuthGuardService,
    public jwtService: JwtService,
    private messageService: MessageDialogService,
    private imgCompressService: ImageCompressService) {
    this.uploader = new FileUploader({
      url: URL,
      authToken: localStorage.getItem('token')
    });
  }
  uploadOne(file: FileItem) {
    file.upload();
    this.uploader.response.subscribe(next => {
      const result = JSON.parse(next);
      console.log(result['content']);
      this.messageService.showMessage(result['msg'], result['content']);
      this.uploader.response.observers.shift();
    }, error => {
      console.log(error);
    }, () => {
      console.log('finfished!!!!!!1');
    });
  }

  alert(title: string, content: string) {
    this.messageService.showMessage(title, content);
  }
  selectFile(file: any) {
  }
  ngOnInit() {
    // refresh token
    this.uploader.setOptions({ url: URL, authToken: sessionStorage.getItem('token') });
  }


}
