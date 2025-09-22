import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { File } from 'src/app/core/providers/file/file';
import { Loading } from 'src/app/core/providers/loading/loading';
import { Translate } from 'src/app/core/providers/translate/translate';
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
    private loadingSrv: Loading,
    private translateSrv: Translate
  ) { }

  async ngOnInit() {
    const uid = localStorage.getItem("uid") || '';

    await this.loadingSrv.present({
      msg: this.translateSrv.instant('TOAST.MESSAGE'),
    });

    this.imgs = await this.uploaderSrv.getUserImageUrls("images", uid);

    await this.loadingSrv.dimiss();
  }

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
    this.actionSheetSrv.present( 
      this.translateSrv.instant('HOME.ACTIONS'), 
      [
      {
        text: this.translateSrv.instant('HOME.LOCKSCREAN'),
        handler: () => console.log('Putting lock screan...'),
      },
      {
        text: this.translateSrv.instant('HOME.HOMESCREAN'),
        handler: () => console.log('Putting home screan...'),
      },
      {
        text: this.translateSrv.instant('HOME.CANCEL'),
        role: 'cancel'
      },
    ]);
  }

  public goToProfile() {
    this.router.navigate(['/user-info']);
  }

  public async pickImage() {
    const uid = localStorage.getItem("uid") || '';
    await this.loadingSrv.present({
      msg: this.translateSrv.instant('TOAST.MESSAGE'),
    });
    this.image = await this.fileSrv.pickImage();
    const path = await this.uploaderSrv.upload(
      "images",
      uid,
      `${Date.now()}-${this.image.name}`,
      this.image.mimeType,
      this.image.data
    );
    const imge = await this.uploaderSrv.getUrl("images", path);
    this.imgs = [imge, ...this.imgs];
    await this.loadingSrv.dimiss();
  }

  public async logOut() {
    await this.loadingSrv.present({
      msg: this.translateSrv.instant('TOAST.MESSAGE'),
    });
    await this.userSrv.logOut()
    await this.loadingSrv.dimiss();
    this.router.navigate(['/']);
    localStorage.removeItem("uid");
  }

}
