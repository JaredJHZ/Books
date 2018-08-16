import { Component, OnInit , OnDestroy} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router} from '@angular/router';
import { Subscription} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user:Subscription;

  constructor(public _userService: UserService, public router: Router ) { 
    this.user = this._userService.fireAuth.authState.subscribe(
      (observer)=> {
        if ( observer !== null) {
          if (observer.hasOwnProperty('uid')){
            this.router.navigate(['/books','main']); 
          }
        }
      }
    );

    
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.user.unsubscribe();
  }

  login(): void {
    this._userService.login();

  }


}
