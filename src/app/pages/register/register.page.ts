import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loading } from 'src/app/core/providers/loading/loading';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;

  constructor(
    private userSrv: User,
    private readonly router: Router,
    private loadingSrv: Loading,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  public async doRegister() {
    await this.loadingSrv.present({
      msg: 'Please wait...'
    });
    await this.userSrv.create(this.registerForm.value);
    this.registerForm.reset();
    await this.loadingSrv.dimiss();
    this.router.navigate(['/']);
  }

  public initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }

}
