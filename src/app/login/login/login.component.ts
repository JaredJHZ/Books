import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _userService: UserService, public router: Router ) { }

  ngOnInit() {
    
  }

  login(): void {
    this._userService.login();
  }


}
