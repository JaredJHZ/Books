import { Component, OnInit, Inject } from '@angular/core';
import {   MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-progress',
  templateUrl: './update-progress.component.html',
  styleUrls: ['./update-progress.component.css']
})
export class UpdateProgressComponent implements OnInit {

  pages:number;
  actualPage:number;
  view:boolean = false;

  constructor(public dialogRef: MatDialogRef<UpdateProgressComponent>, @Inject(MAT_DIALOG_DATA) public data:any ) {
    this.pages = 0;
    
   }

  ngOnInit() {

  }

  guardar() {
    this.dialogRef.close({pages:this.pages,actualP:this.actualPage});
  }

  cancelar() {
    this.dialogRef.close(0);
  }

  change() {
    this.view = ! this.view;
  }

}
