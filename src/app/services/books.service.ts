import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Book } from '../interfaces/book.interface';
import {Http, Headers} from '@angular/http';
import { User } from '../interfaces/user.interface';
import {map} from 'rxjs/operators';
import { url } from '../urls';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import { Query } from '@firebase/firestore-types';
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


  constructor(private _userService:UserService, private http:Http, private snack:MatSnackBar, private router:Router , private fire:AngularFirestore) {
    this.user = this._userService.getInfo();
    
  }

  saveBook(book:Book) {
  this.user = this._userService.getInfo();
   let bookUrl =  this.fire.collection('users').doc(this.user.id).collection('books').add( book ).then(
      (book)=> {
        this._userService.user = this._userService.getInfo();
        let uid = this._userService.user.id;
        let updateId = this.fire.collection('users').doc(this.user.id).collection('books').doc(book.id).update(
           
            {id:book.id, uid: uid}
        );
      }
   );

   return bookUrl;
  }

  getAllBooks():Book[]{
   this.user = this._userService.getInfo();
   let books = this.fire.collection('users').doc(this.user.id).collection('books');
   let library: Book[] = [];
   let query = books.ref.get().then(
    (querySnapshot) => {
      querySnapshot.forEach(function(book) {
       library.push(
         {id: book.id, title: book.data().title, author: book.data().author,
           pages: book.data().pages, publisher: book.data().publisher, read: book.data().pagesR 
         }
        );
    });
    }
   )
   return library;
  }

  getBook(id: string) {
    this.user = this._userService.getInfo();
    let book = this.fire.collection('users').doc(this.user.id).collection('books').doc(id);
    let bookInfo;
    return new Promise ( (resolve,reject) => {
      let query = book.ref.get().then(
        (book) => {
          if (book.exists === false) {
            reject('No info');
          }
          resolve(book.data());
        }
      )
    })
    
  }

  deleteBook(id:string) {
    let bookD = this.fire.collection('users').doc(this.user.id).collection('books').doc(id);

    bookD.delete().then(
      ()=>this.snack.open('Book deleted','close',{duration:1000})
    ).catch(()=> console.log('error'));
  }

  updateBook(id:string,pages:number) {
    let bookU = this.fire.collection('users').doc(this.user.id).collection('books').doc(id);
    return new Promise ((resolve,reject) => {
      bookU.update({
        'pagesR':pages
      }).then(
        (ok)=> { 
          this.snack.open('Pages updated','close',{duration:1000});
          resolve(true);
        } 
      )
    })
  }

  updateBookInfo(id: string, info:any) {
    let bookU = this.fire.collection('users').doc(this.user.id).collection('books').doc(id);
    return new Promise ((resolve,reject) => {
      bookU.update({
        'title':info.title,
        'author': info.author,
        'publisher': info.publisher
      }).then(
        (ok)=> { 
          this.snack.open('Pages updated','close',{duration:1000});
          resolve(true);
        } 
      )
    })
  }


}
