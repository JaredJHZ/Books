import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/book.interface';
import { UpdateFileService } from '../../services/update-file.service';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  booksForm: FormGroup;
  book: Book;
  file:any;
  constructor(private route:ActivatedRoute, private _bookService:BooksService , private _uploadservice:UpdateFileService) {
    this.booksForm = new FormGroup(
      {
        'title': new FormControl('',[Validators.required]),
        'author':new FormControl('', [Validators.required]),
        'publisher':new FormControl('', [Validators.required])
      }
  );
    
   }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        let id = params['id'];
        if( id) {
          this._bookService.getBook(id).then(
            (book:any) => {
              this.book = book;
              this.booksForm.setValue({title:this.book.title, author: this.book.author , publisher: this.book.publisher});
            }
          )
        }
      }
      );
  }

  
  isNumber(control:FormControl):{[s:string]:boolean}{
    let num =  parseInt(control.value) || 'no number';
    let zero = (control.value === 0) ? true:false;
    let isnum = typeof num == 'number' ? true:false;
    if(isnum === false && zero === false) {
      return {
        notNumber:true
      }
    }
    return null;
  }

  selectImage(event:any){
    this.file = event[0];
  }

  update() {
    this._bookService.updateBookInfo(this.book.id,this.booksForm.value);
    this._uploadservice.upload(this.file, this.book.id);

    
  }

}
