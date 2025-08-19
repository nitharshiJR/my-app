import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DeclpostComponent } from './declpost/declpost.component';
import { FormsModule } from '@angular/forms';
import { AltPagesComponent } from './alt-pages/alt-pages.component';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    HomeComponent,
    DeclpostComponent,
    AltPagesComponent,
    SinglePostComponent   
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    FormsModule,
  ],
  providers: [
    provideHttpClient() // Provide HttpClient for making HTTP requests
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
