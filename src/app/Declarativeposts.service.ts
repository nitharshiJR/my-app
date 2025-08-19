import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IPost } from "./Ipost";
import { catchError, map } from 'rxjs/operators';
import { Observable, combineLatest, BehaviorSubject, throwError } from 'rxjs';
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class DeclarativePostsService {
  private apiUrl = 'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/posts.json';

  // Subjects
  private selectedPostSubject = new BehaviorSubject<string | null>(null);
  selectedPostActions$ = this.selectedPostSubject.asObservable();

  // Streams
  posts$: Observable<IPost[]>;
  postsWithCategory$: Observable<IPost[]>;
  selectedPost$: Observable<IPost | null>;

  constructor(private http: HttpClient, private categoryService: CategoryService) {
    // fetch posts
    this.posts$ = this.getPosts();

    // combine posts with categories
    this.postsWithCategory$ = combineLatest([
      this.posts$, 
      this.categoryService.getCategories()
    ]).pipe(
      map(([posts, categories]) =>
        posts.map(post => ({
          ...post,
          categoryName: categories.find(c => c.id === post.categoryId)?.title
        }) as IPost)
      )
    );

    // get selected post details
    this.selectedPost$ = combineLatest([
      this.postsWithCategory$,
      this.selectedPostActions$
    ]).pipe(
      map(([posts, selectedPostId]) =>
        posts.find(post => post.id === selectedPostId) || null
      )
    );
  }

  // Trigger post selection
  selectPost(postId: string) {
    this.selectedPostSubject.next(postId);
  }

  // Fetch posts from Firebase
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
      }),
      catchError(this.handleError)
    );
  }

  // Error handler
  private handleError(error: any) {
    console.error('Error fetching posts:', error);
    return throwError(() => new Error('404 Not Found'));
  }
}
