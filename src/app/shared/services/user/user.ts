import { Injectable } from '@angular/core';
import { Auth } from 'src/app/core/providers/auth/auth';
import { Query } from 'src/app/core/providers/query/query';
import { IUserCreated } from 'src/app/interfaces/user.interface';

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
    } catch (error) {
      console.log(error);
    }
  }
  
}
