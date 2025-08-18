import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IPost } from "./Ipost";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // still provided in root
})
export class PostService {
  private apiUrl = 'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
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
