import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { File } from 'src/app/core/providers/file/file';
import { Loading } from 'src/app/core/providers/loading/loading';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { IImage } from 'src/app/interfaces/image.interface';
import { ActionSheet } from 'src/app/shared/providers/actionSheet/action-sheet';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public image!: IImage;
  public imgs: string[] = [];
  public groupedImgs: string[][] = [];

  constructor(
    private readonly fileSrv: File,
    private userSrv: User,
    private readonly router: Router,
    private readonly uploaderSrv: Uploader,
    private actionSheetSrv: ActionSheet,
    private loadingSrv: Loading
  ) { }

  ngOnInit() {}

  public onButtonClick(action: string) {
    switch(action) {

      case 'logout':
        this.logOut();
        break;
      
      case 'add':
        this.pickImage();
        break;
      
      case 'profile':
        this.goToProfile();
        break;

      default:
        console.warn('Action not found: ', action);
    }
  }

  public openActions() {
    this.actionSheetSrv.present('Actions', [
      {
        text: 'Lock screan',
        handler: () => console.log('Putting lock screan...'),
      },
      {
        text: 'Home screan',
        handler: () => console.log('Putting home screan...'),
      },
      {
        text: 'Cancel',
        role: 'cancel'
      },
    ]);
  }

  public goToProfile() {
    console.log("Go to profile...");
  }

  public async pickImage() {
    await this.loadingSrv.present({
      msg: 'Please wait...'
    });
    this.image = await this.fileSrv.pickImage();
    const path = await this.uploaderSrv.upload(
      "images",
      `${Date.now()}-${this.image.name}`,
      this.image.mimeType,
      this.image.data
    );
    const imge = await this.uploaderSrv.getUrl("images", path);
    this.imgs = [...this.imgs, imge];
    await this.loadingSrv.dimiss();
  }

  public async logOut() {
    await this.loadingSrv.present({
      msg: 'Please wait...'
    });
    await this.userSrv.logOut()
    await this.loadingSrv.dimiss();
    this.router.navigate(['/']);
  }

}
