import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { JwtService } from '../jwt.service';
import { MessageDialogService } from '../message-dialog.service';
import { ImageCompressService, ResizeOptions, ImageUtilityService } from 'ng2-image-compress';

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
    public jwtService: JwtService,
    private messageService: MessageDialogService,
    private imgCompressService: ImageCompressService) {
    this.uploader = new FileUploader({
      url: URL,
      authToken: sessionStorage.getItem('token')
    });
  }
  uploadOne(file: FileItem) {
    file.upload();
    this.uploader.response.subscribe(next => {
      const result = JSON.parse(next);
      console.log(result['msg']);
      console.log(result['content']);
      this.messageService.showMessage(result['msg'], result['content']);
    }, error => {
      console.log(error);
    }, () => {
      console.log('finfished!!!!!!1');
    });
    this.uploader.response = null;
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
