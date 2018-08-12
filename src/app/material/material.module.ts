import { NgModule } from '@angular/core';
//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [MatSidenavModule,MatButtonModule,MatCardModule,MatSnackBarModule],
  declarations: []
})
export class MaterialModule { }
