import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  user:any;
  constructor(private _userService:UserService, private route:Router){}
  
  canActivate():boolean{
    this.user = this._userService.getInfo();
    if(this.user) {
      this.route.navigate(['/books','main']);
      return false;
    }else {
      return true;
    }
  }
}
