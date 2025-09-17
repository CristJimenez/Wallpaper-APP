import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public image!: IImage;
  public img: string = '';

  constructor(
    private readonly fileSrv: File,
    private userSrv: User,
    private readonly router: Router,
    private readonly uploaderSrv: Uploader,
  ) { }

  ngOnInit() {
  }

  public async pickImage() {
    this.image = await this.fileSrv.pickImage();
    const path = await this.uploaderSrv.upload(
      "images",
      `${Date.now()}-${this.image.name}`,
      this.image.mimeType,
      this.image.data
    );
    this.img = await this.uploaderSrv.getUrl("images", path);
  }

  public async logOut() {
    await this.userSrv.logOut()
    this.router.navigate(['/']);
  }

}
