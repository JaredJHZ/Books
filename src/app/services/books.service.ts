import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Book } from '../interfaces/book.interface';
import {Http, Headers} from '@angular/http';
import { User } from '../interfaces/user.interface';
import {map} from 'rxjs/operators';
import { url } from '../urls';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  user:User;
  url = url.url_users;

  book: Book = {
    id: null,
    author: null,
    title: null,
    publisher: null,
    pages: null,
    read: null
  };


  constructor(private _userService:UserService, private http:Http, private snack:MatSnackBar, private router:Router) {
    this.user = this._userService.getInfo();
    
  }

  saveBook(book:Book) {
    let url = `${this.url}${this.user.id}/books/.json`;
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.post(url,book,{headers}).pipe(
      map(
        (book) => {
          this.snack.open('Book added to your library','close',{duration:1000});
        }
      )
    )
  }

  getAllBooks(){
    let url =  `${this.url}${this.user.id}/books/.json`;
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.get(url,{headers}).pipe(
      map(
        (response: any)=> {
          return JSON.parse(response._body);
        }
      
      ) 
    )
  }

  getBook(id: string) {
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${this.url}${this.user.id}/books/${id}.json`;
    return this.http.get(url, {headers}).pipe(
      map(
        (resp: any) => {
         this.book = JSON.parse(resp._body);
         return this.book;
        }
      )
    )
  }


}
