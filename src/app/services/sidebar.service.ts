import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  Menu:any =  [
    {
      title: 'Profile',
      url:'main'
    },
    {
      title:'Library',
      url:'library'
    },
    {
      title:'Add book',
      url:'add'
    }
  ]


}
