import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from 'src/app/core/providers/file/file';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public image = {};

  constructor(
    private readonly fileSrv: File,
    private userSrv: User,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  public async pickImage() {
    this.image = await this.fileSrv.pickImage();
  }

  public async logOut() {
    await this.userSrv.logOut()
    this.router.navigate(['/']);
  }

}
