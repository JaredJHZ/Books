import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {url} from '../urls';
import {Http, Headers} from '@angular/http';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

user: User;


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
    localStorage.setItem('user', user.email);
    localStorage.setItem('username',user.displayName);
    localStorage.setItem('photo',user.photoURL);
    localStorage.setItem('id', user.uid);
    
    this.http.get(`${this.url}${user.uid}.json`).subscribe(
      (user:any)=> {
 
        if(user._body === 'null') {
          this.user = this.getInfo();

          let newUser = {
            user: this.user.name,
            email: this.user.email
          }
          let headers = new Headers({
            'Content-Type':'application/json'
          });
          this.http.post(`${this.url}${this.user.id}.json`,newUser,{headers}).subscribe(
            (newUser) => {
              console.log(newUser);
            }
          )
        }else {
          this.route.navigate(['/books','main']);
          this.snackbar.open('Bienvenido de nuevo','close',{duration:1000});
          
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

  getInfo(): User{
    let user: User = {
      email : localStorage.getItem('user'),
      name : localStorage.getItem('username'),
      photo : localStorage.getItem('photo'),
      id : localStorage.getItem('id')
    };
    return user;
  }
}
