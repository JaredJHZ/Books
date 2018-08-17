import { Component, OnInit, Inject } from '@angular/core';
import {   MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-progress',
  templateUrl: './update-progress.component.html',
  styleUrls: ['./update-progress.component.css']
})
export class UpdateProgressComponent implements OnInit {

  pages:number;

  constructor(public dialogRef: MatDialogRef<UpdateProgressComponent>, @Inject(MAT_DIALOG_DATA) public data:any ) {
    this.pages = 0;
   }

  ngOnInit() {

  }

  guardar() {
    this.dialogRef.close(this.pages);
  }

  cancelar() {
    this.dialogRef.close(0);
  }

}
