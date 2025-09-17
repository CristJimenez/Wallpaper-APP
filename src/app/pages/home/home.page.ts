import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { File } from 'src/app/core/providers/file/file';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { IImage } from 'src/app/interfaces/image.interface';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  @ViewChild('optionsModal') optionsModal!: IonModal;

  public image!: IImage;
  public imgs: string[] = [];
  public groupedImgs: string[][] = [];

  constructor(
    private readonly fileSrv: File,
    private userSrv: User,
    private readonly router: Router,
    private readonly uploaderSrv: Uploader,
  ) { }

  ngOnInit() {}

  public openModal() {
    this.optionsModal.present();
  }

  public async pickImage() {
    this.image = await this.fileSrv.pickImage();
    const path = await this.uploaderSrv.upload(
      "images",
      `${Date.now()}-${this.image.name}`,
      this.image.mimeType,
      this.image.data
    );
    const imge = await this.uploaderSrv.getUrl("images", path);
    this.imgs = [imge, ...this.imgs];
  }

  public async logOut() {
    await this.userSrv.logOut()
    this.router.navigate(['/']);
  }

}
