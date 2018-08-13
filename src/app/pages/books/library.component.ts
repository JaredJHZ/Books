import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  library:any[]=[];

  constructor(private _booksService:BooksService, private router:Router) {
    this._booksService.getAllBooks().subscribe(
      (library:any) => {
        this.library = library;
      }
    );
   }

  ngOnInit() {

  }

  goTo(id: string) {
    this.router.navigate(['/books',id]);
  }

}
