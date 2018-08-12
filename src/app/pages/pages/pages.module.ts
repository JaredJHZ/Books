import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { MaterialModule } from '../../material/material.module';
import { SidebarComponent } from '../shared/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { AddBookComponent } from '../books/add-book.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[HomeComponent, SidebarComponent,MaterialModule],
  declarations: [HomeComponent, SidebarComponent, AddBookComponent],
  providers:[SidebarService]
})
export class PagesModule { }
