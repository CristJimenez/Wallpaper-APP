import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Loading } from 'src/app/core/providers/loading/loading';
import { Translate } from 'src/app/core/providers/translate/translate';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
  standalone: false,
})
export class UserInfoPage implements OnInit {

  public language = false;
  public uid!: string;

  public name!: FormControl;
  public lastName!: FormControl;
  public userForm!: FormGroup;

  constructor(
    private translateSrv: Translate,
    private userSrv: User,
    private loadingSrv: Loading,
  ) { }

  ngOnInit() {
    this.initForm();
    this.uid = localStorage.getItem("uid") || '';
    this.loaderInfo();
  }

  public async update() {
    await this.loadingSrv.present({
      msg: this.translateSrv.instant('TOAST.MESSAGE'),
    });
    await this.userSrv.update(this.uid, this.userForm.value);
    await this.loadingSrv.dimiss();
  }
  
  public async loaderInfo() {
    const userInfo = await this.userSrv.getUserInfo(this.uid);
    this.userForm.patchValue({
      name: userInfo['name'] || '',
      lastName: userInfo['lastName'] || '',
    });
    console.log(this.userForm.value);
  }

  public changeLang(state: boolean) {
    const lang = state ? 'es' : 'en';
    this.translateSrv.useLang(lang);
  }

  public initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.userForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
    });
  }

}
