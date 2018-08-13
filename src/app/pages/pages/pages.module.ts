import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { MaterialModule } from '../../material/material.module';
import { SidebarService } from '../../services/sidebar.service';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { AddBookComponent } from '../books/add-book.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LibraryComponent } from '../books/library.component';
import { KeysPipe } from '../../pipes/keys.pipe';
import { BookComponent } from '../books/book.component';
import {ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule 
    
  ],
  exports:[HomeComponent,MaterialModule],
  declarations: [HomeComponent, AddBookComponent, LibraryComponent,KeysPipe, BookComponent],
  providers:[SidebarService,KeysPipe]
})
export class PagesModule { }
