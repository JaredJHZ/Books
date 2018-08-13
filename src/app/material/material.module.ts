import { NgModule } from '@angular/core';
//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule
  ],
  exports: [MatSidenavModule,MatButtonModule,MatCardModule,MatSnackBarModule,MatInputModule],
  declarations: []
})
export class MaterialModule { }
