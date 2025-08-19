import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DeclpostComponent } from './declpost/declpost.component';
import { AltPagesComponent } from './alt-pages/alt-pages.component';
const routes: Routes = [
  {path: '', component: HeaderComponent}, // Default route     
  { path: 'posts', component: PostsComponent },
   {path: 'home', component: HomeComponent},
   {path: 'declarativepost', component: DeclpostComponent},
    {path: 'altposts', component: AltPagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
