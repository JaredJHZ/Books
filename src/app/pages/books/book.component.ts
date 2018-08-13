import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import {ActivatedRoute} from '@angular/router';
import { Book } from '../../interfaces/book.interface';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book = null;
  public labels:string[] = ['Leido', 'No leido'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  constructor(private _bookService:BooksService, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params)=> {
        let id = params['id'];
        this._bookService.getBook(id).subscribe(
          (book: Book) => {
            this.book = book
            this.doughnutChartData.push(this.book.read);
            this.doughnutChartData.push(this.book.pages);
          }
        );
      }
    )
   }

  ngOnInit() {
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
