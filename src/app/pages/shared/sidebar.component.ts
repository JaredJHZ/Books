import { Component, OnInit,  ViewChild, Input } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebar') public sidenav: MatSidenav;
  username: string;
  email:string
  photo:string;
  Menu:any;

  constructor(private _sidebarService:SidebarService, private router:Router, private _userService:UserService){ 
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('user');
    this.photo = localStorage.getItem('photo');
    this.Menu = this._sidebarService.Menu;
    this._sidebarService.notificacion.subscribe(
      (open) => {
        if (open === true) {
          this.sidenav.open();
        }else {
          this.sidenav.close();
        }
      }
    )
  }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }

  

}
