import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  email: string;

  constructor(private _sidebarService: SidebarService) { 

  }

  ngOnInit() {
    

  }

  openSidebar(){
    this._sidebarService.setOpen();
  }

}
