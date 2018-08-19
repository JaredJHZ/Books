import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
//material

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages/pages.module';
import { LoginComponent } from './login/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

//routes

import {APPR} from './app.routes';
import { MainComponent } from './pages/main/main.component';


//firebase
import { AngularFireModule } from 'angularfire2';
import {firebase} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { UsernamePipe } from './pipes/username.pipe';
import { AngularFirestore } from 'angularfire2/firestore';
import { UpdateBookComponent } from './pages/home/update-book.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UsernamePipe,
    UpdateBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    APPR,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
