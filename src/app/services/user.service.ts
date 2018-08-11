import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

user: any;



  constructor(public fireAuth: AngularFireAuth) {
    
  }

  login(): void {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  logout(): void {
    this.fireAuth.auth.signOut();
    this.delete();
    this.user = null;
  }

  save(user:any){
    this.user = user;
    localStorage.setItem('user', this.user.email);
    localStorage.setItem('username',this.user.displayName);
    localStorage.setItem('photo',this.user.photoURL);
  }
  delete() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('photo');
  }
  isLogged(): boolean {
    if(localStorage.getItem('user')){
      return true;
    } else {
      return false;
    }
  }
}
