import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../../interfaces/book.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  num = 3;
 
  private booksCollection: AngularFirestoreCollection<Book>; //creo una coleccion de firestore de tipo Book 
  books: Observable<Book[]>; // creo un observable para actualizar en tiempo real los libros
  user:any;

  constructor(private _userService: UserService, private router:Router, private afs:AngularFirestore, private _bookService:BooksService) {
    this.user = this._userService.getInfo(); // obtengo la info del usuario
  }

  ngOnInit() {
    this.booksCollection = this.afs.collection('users').doc(this.user.id).collection('books'); //hago referencia al enlace del usuario
    this.books = this.booksCollection.valueChanges(); // asigno el observable de el enlace de los libros del usuario
  }

  goTo(id: string) {
    this.router.navigate(['/books',id]);
  }

  delete(id:string) {
    this._bookService.deleteBook(id);
  }

  noDelete(){
    return;
  }

}