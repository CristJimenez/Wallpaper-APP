import { Injectable } from '@angular/core';
import { Auth as AuthFirebase, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(
    private readonly afb: AuthFirebase,
  ) {}

  async register(correo: string, password: string) {
    try {
      const resp = await createUserWithEmailAndPassword(
        this.afb,
        correo,
        password,
      );
      return resp.user.uid;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  async logIn(correo: string, password: string) {
    try {
      const resp = await signInWithEmailAndPassword(
        this.afb,
        correo,
        password,
      );
      return resp.user.uid;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  async logOut() {
    try {
      await signOut(this.afb);
    } catch (error) {
      console.log(error);
    }
  }
  
}
