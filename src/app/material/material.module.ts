import { NgModule } from '@angular/core';
//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatBadgeModule
  ],
  exports: [MatSidenavModule,MatButtonModule,MatCardModule,MatSnackBarModule,MatInputModule,MatBadgeModule],
  declarations: []
})
export class MaterialModule { }
