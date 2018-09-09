import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { UpdateProgressComponent } from './update-progress/update-progress.component';
import { BaseChartDirective } from 'ng2-charts';
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

  constructor(private _bookService:BooksService, private route: ActivatedRoute, public dialog:MatDialog, private snack:MatSnackBar, private router:Router) {
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
        console.log(pages);
        if(pages.pages > 1) {
          var nPages = pages.pages + this.book.pagesR;
        }else if (pages.actualP > 0 ){
          var nActual = pages.actualP;
        }
        //si se cancela
        if( pages.pages === undefined && pages.actualPage === undefined || nPages > this.book.pages && pages.actualPage === undefined || pages.pages < 0 && pages.actualPage === undefined) 
        {
          return this.snack.open('Numéro imposible', 'close', {duration:1000});
        }

        if (nPages > 1) {
          this._bookService.updateBook(this.book.id, nPages).then(
            (ok) => {

                this.book.pagesR = nPages; 
                this.doughnutChartData[0] = this.percentBook(this.book.pages,this.book.pagesR);
                this.chart.ngOnChanges({});
                
              }
              );
            }
            else{
              this._bookService.updateBook(this.book.id, nActual).then(
                (ok) => {
                  if(ok) {
                    this.book.pagesR = nActual;
                    this.doughnutChartData[0] = this.percentBook(this.book.pages,this.book.pagesR);
                    this.chart.ngOnChanges({});
                    
              }
            }
          )
        }
      
      }
    )
  }

  updateInfo() {
    this.router.navigate(['/books','update',this.book.id]);
  }

}
