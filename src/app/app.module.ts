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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    HomeComponent,
    DeclpostComponent   
  
    
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
