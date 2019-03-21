import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {PostComponent} from './components/post/post.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from '@app/index';

const routes: Routes = [
  { path: '',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about',  component: AboutComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'post/:id',  component: PostComponent, canActivate: [AuthGuard] },
  { path: '**',    component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
