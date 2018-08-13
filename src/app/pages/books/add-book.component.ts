import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BooksService } from '../../services/books.service';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  booksForm: FormGroup;

  constructor(private snack:MatSnackBar, private _bookService: BooksService) {
    this.booksForm = new FormGroup(
        {
          'title': new FormControl('',[Validators.required]),
          'author':new FormControl('', [Validators.required]),
          'publisher':new FormControl('', [Validators.required]),
          'pages': new FormControl('', [Validators.required,this.isNumber]),
          'pagesR': new FormControl('', [Validators.required, this.isNumber])
        }
    );
   }

  ngOnInit() {
  }

  guardar(){
    if (this.booksForm.status === 'INVALID'){
      this.snack.open('Error verifique los campos','close',{duration:2000});
      return;
    } 
    this._bookService.saveBook(this.booksForm.value).subscribe();
   
  }

  isNumber(control:FormControl):{[s:string]:boolean}{
    if(typeof control.value !== 'number'){
      return{
        notNumber:true
      }
    }
    return null;
  }
}
