import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {url} from '../urls';
import {Http, Headers} from '@angular/http';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import { Query } from '@firebase/firestore-types';
@Injectable({
  providedIn: 'root'
})
export class UserService {

user: User;


  url: string = url.url_users;

  constructor(public fireAuth: AngularFireAuth , private http:Http, private snackbar:MatSnackBar, private route: Router, private fire:AngularFirestore) {
    
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

        let u = this.getInfo();
        let allUsers = this.fire.collection('users');
        let query:Query = allUsers.ref.where('users','==',u.id);
        query.get().then(
          (docs)=> {
            if(docs.size > 0){
              console.log('Usuarios ya registrado');
            } else { 
              allUsers.doc(u.id).set({
                name: u.name,
                email: u.email,
                photo: u.photo
              });
            //  this.route.navigate(['/books','main']);
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
