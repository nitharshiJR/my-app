import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IPost } from "./Ipost";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { combineLatest } from "rxjs";
import { DeclarativeCategoryService } from "./DeclarativeCategory.service";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class DeclarativePostsService {
  private apiUrl = 'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/';

  posts$!: Observable<IPost[]>;   // declare only, no init
  postsWithcategory$:any
  constructor(private http: HttpClient,private categoryService:CategoryService) {
    this.posts$ = this.getPosts(); // ✅ safe to assign here
    this.postsWithcategory$= combineLatest([this.posts$, 
      this.categoryService.getCategories()
    ]).pipe(
      map(([posts, category]) => {
        return posts.map((post)=>{
          return{
            ...post,
            categoryName: category.find(
              (category)=> category.id===post.categoryId
            )?.title,
          } as IPost;
        })
      
      }))
  }  
  


  getPosts(): Observable<IPost[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(posts => {
        const postData: IPost[] = [];
        if (posts) {
          for (let id in posts) {
            postData.push({ ...posts[id], id });
          }
        }
        return postData;
      })
    );

   
    
  }
}
