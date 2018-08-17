import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { UpdateProgressComponent } from './update-progress/update-progress.component';
import { BaseChartDirective } from '../../../../node_modules/ng2-charts';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
@ViewChild(BaseChartDirective)
public chart: BaseChartDirective;
  book: any;
  public labels:string[] = ['Read', 'Not read'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  options = {
    'responsive': true,
    'maintainAspectRatio': false
  }

  constructor(private _bookService:BooksService, private route: ActivatedRoute, public dialog:MatDialog, private snack:MatSnackBar) {
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

  public update() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {};
    let dialog = this.dialog.open(UpdateProgressComponent,dialogConfig);
    dialog.afterClosed().subscribe(
      (pages)=> {
        let nPages = pages + this.book.pagesR;
        //si se cancela
        if( pages === undefined || nPages > this.book.pages || pages < 0) 
        {
          return this.snack.open('Numéro imposible', 'close', {duration:1000});
        }
        this._bookService.updateBook(this.book.id, nPages).then(
          (ok) => {
            if(ok) {
              this.book.pagesR = nPages; 
              this.doughnutChartData[0] = this.percentBook(this.book.pages,this.book.pagesR);
              this.chart.ngOnChanges({});
              
            }
          }
        )
      }
    )
  }


}
