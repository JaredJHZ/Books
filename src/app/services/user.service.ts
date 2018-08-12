import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {url} from '../urls';
import {Http, Headers} from '@angular/http';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

user: any;

  url: string = url.url_users;

  constructor(public fireAuth: AngularFireAuth , private http:Http, private snackbar:MatSnackBar, private route: Router) {
    
  }

  login(): void {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  logout(): void {
    this.fireAuth.auth.signOut();
    this.delete();
    this.user = null;
    this.snackbar.open('Hasta luego','close',{duration:1000});
  }

  save(user:any){
    this.user = user;
    localStorage.setItem('user', this.user.email);
    localStorage.setItem('username',this.user.displayName);
    localStorage.setItem('photo',this.user.photoURL);
    localStorage.setItem('id', this.user.uid);
    this.http.get(`${this.url}${user.uid}.json`).subscribe(
      (user:any)=> {
        if(user._body == 'null') {
          let newUser = {
            user: this.user.displayName,
            email: this.user.email
          }
          let headers = new Headers({
            'Content-Type':'application/json'
          });
          this.http.post(`${this.url}${this.user.uid}.json`,newUser,{headers}).subscribe(
            (newUser) => {
              console.log(newUser);
            }
          )
        } else {
          this.snackbar.open('Bienvenido de nuevo','close',{duration:1000});
          this.route.navigate(['/books','main']);

        }
      }
    )
  }
  delete() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('photo');
    localStorage.removeItem('id');
  }
  isLogged(): boolean {
    if(localStorage.getItem('user')){
      return true;
    } else {
      return false;
    }
  }

  getInfo(): any{
    let user: any = {};
    user.email = localStorage.getItem('user');
    user.username = localStorage.getItem('username');
    user.photo = localStorage.getItem('photo');
    return user;
  }
}
