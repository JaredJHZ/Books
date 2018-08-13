import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  user: User;
  menu:any;

  constructor(private _sidebarService: SidebarService, private _userService:UserService) { 
    this.user = this._userService.getInfo();
    this.menu = this._sidebarService.Menu;
  }

  ngOnInit() {
    

  }

  open(sidebar){
    sidebar.toggle()
  }

  logout(): void{
    this._userService.logout();
  }

  
  

}
