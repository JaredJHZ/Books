import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  booksForm: FormGroup;

  constructor(private snack:MatSnackBar, private _bookService: BooksService, private router:Router) {
    this.booksForm = new FormGroup(
        {
          'title': new FormControl('',[Validators.required]),
          'author':new FormControl('', [Validators.required]),
          'publisher':new FormControl('', [Validators.required]),
          'pages': new FormControl('', [Validators.required, this.isNumber]),
          'pagesR': new FormControl('', [Validators.required, this.isNumber])
        }
    );
   }

  ngOnInit() {
  }

  guardar(): void{

    if (this.booksForm.status === 'INVALID'){
      this.errorsHandler();
      return;
    } 
    this._bookService.saveBook(this.booksForm.value).then(
      (id:any) => {
        this.snack.open('Book added to your library','close',{duration:1000});

        this.router.navigate(['/books','update',id]);
      }
    )
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

  errorsHandler(): void {
    let errors:string ='';
    for(let control in this.booksForm.controls) {

      if(this.booksForm.controls[control].errors!== null) {
        for(let e in this.booksForm.controls[control].errors) {
          errors += control+' : '+e+'\n';
        }
      }
    }
   this.snack.open('Errors: '+errors,'close',{duration:3000});
  }
}