import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { UserLoginGuard } from './guards/user-login.guard';
import { AddBookComponent } from './pages/books/add-book.component';
import { LibraryComponent } from './pages/books/library.component';
import { BookComponent } from './pages/books/book.component';

const AppRoutes:Routes = [
{
    path:'books',
    canActivate:[UserLoginGuard]
    ,
    component:HomeComponent,
    children:[{
        path:'main',
        component:MainComponent
    },
    {
        path:'add',
        component:AddBookComponent
    },
    {
        path:'library',
        component:LibraryComponent
    },
    {
        path:':id',
        component: BookComponent
    }, {
        path:'',
        component: MainComponent,
        
        
    },
    {
        path:'**',
        redirectTo:'main',
        pathMatch:'full'
    }
]
    
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'',
    component:LoginComponent
},{
    path:'**',
    redirectTo:'login',
    pathMatch:'full'
}
];

export const APPR = RouterModule.forRoot(AppRoutes);