import { NgModule } from '@angular/core';
//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatBadgeModule,
    MatDialogModule,
    NoopAnimationsModule
  ],
  exports: [MatSidenavModule,MatButtonModule,MatCardModule,MatSnackBarModule,MatInputModule,MatBadgeModule,
  MatDialogModule],
  declarations: []
})
export class MaterialModule { }
