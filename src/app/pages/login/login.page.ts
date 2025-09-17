import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  constructor(
    private userSrv: User,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public async logIn() {
    await this.userSrv.logIn(this.email.value, this.password.value);
    this.router.navigate(['/home']);
  }

  public initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

}
