import { NgModule } from '@angular/core';
//angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [MatSidenavModule,MatButtonModule,MatCardModule],
  declarations: []
})
export class MaterialModule { }
