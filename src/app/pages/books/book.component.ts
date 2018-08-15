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

  book: any;
  public labels:string[] = ['Read', 'Not read'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  constructor(private _bookService:BooksService, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params)=> {
            let id = params['id'];
            this._bookService.getBook(id).then(
              (book)=>{
                this.book = book;
                let percentRead = this.percentBook(this.book.pages,this.book.pagesR);
                let total = this.percentBook(this.book.pages,this.book.pages) - percentRead;
                this.doughnutChartData.push(percentRead);
                this.doughnutChartData.push(total);
              }
            )
          }
        );
  }
    
   percentBook(pages,read): number {
      return ( read * 100) / pages; 
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
