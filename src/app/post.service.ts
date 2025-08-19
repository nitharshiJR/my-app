import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { IPost } from './Ipost';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getPosts() {
    return this.http
      .get<{ [id: string]: IPost }>(`${this.baseUrl}/posts.json`)
      .pipe(
        map((posts) => {
          let postsData: IPost[] = [];
          for (let id in posts) {
            postsData.push({ ...posts[id], id });
          }
          return postsData;
        })
      );
  }

  getPostsWithCategory() {
    return this.getPosts().pipe(
      mergeMap((posts) => {
        return this.categoryService.getCategories().pipe(
          map((categories) => {
            return posts.map((post) => {
              return {
                ...post,
                categoryName: categories.find(
                  (category) => category.id === post.categoryId
                )?.title, // make sure category service returns "name"
              };
            });
          })
        );
      })
    );
  }

  addPost(post: IPost) {
    return this.http
      .post<{ name: string }>(`${this.baseUrl}/posts.json`, post)
      .pipe(
        map((response) => {
          return { ...post, id: response.name };
        })
      );
  }
}
