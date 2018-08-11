import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  Menu:any =  [
    {
      title: 'Profile'
    },
    {
      title: 'Comunnity'
    },
    {
      title:'Books'
    }
  ]

  private open: boolean;
  public notificacion:EventEmitter<boolean>; 

  constructor() { 
    this.open = false;
    this.notificacion = new EventEmitter<boolean>();
    this.notificacion.emit(this.open);
  }

  setOpen(): void {
    this.open = true;
    this.notificacion.emit(this.open);
  }

  setClose(): void {
    this.open = false;
    this.notificacion.emit(this.open);
  }
}
