import { Injectable } from '@angular/core';
import { Auth } from 'src/app/core/providers/auth/auth';
import { Query } from 'src/app/core/providers/query/query';
import { IUserCreated, IUserGet } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(
    private readonly authSrv: Auth,
    private readonly querySrv: Query,
  ) {}

  async create(user: IUserCreated): Promise<void> {
    try {
      const uid = await this.authSrv.register(user.email, user.password);
      await this.querySrv.set("users", uid, {
        uid,
        name: user.name,
        lastName: user.lastName,
      });
      await this.logOut();
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo(uid: string): Promise<any> {
    try {
      const resp = await this.querySrv.get("users", uid);
      if(resp) {
        return resp;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(uid: string, user: IUserGet): Promise<void> {
    try {
      await this.querySrv.update("users", uid, {
        name: user.name,
        lastName: user.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logIn(email: string, password: string) {
    const uid = await this.authSrv.logIn(email, password);
    return uid;
  }

  async logOut() {
    await this.authSrv.logOut();
  }
  
}
