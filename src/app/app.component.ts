import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'booksApp';
  bandera = true;

  constructor(public fireAuth:AngularFireAuth, public _userService:UserService, public router:Router){
    this.fireAuth.authState.subscribe(
      (user: any) => {
        if(user) {
            this._userService.save(user);
            this.fireAuth.auth.onAuthStateChanged((user)=> {
              if(!user){
                this.router.navigate(['/login']);
              }
             })
        }else {
          this.router.navigate(['/login']);
        }
      }
    )
  }
}
