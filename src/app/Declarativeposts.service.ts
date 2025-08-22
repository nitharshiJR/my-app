import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IPost, CRUDAction } from "./Ipost";
import {
  catchError,
  map,
  shareReplay,
  delay,
  scan,
  concatMap
} from 'rxjs/operators';
import {
  Observable,
  combineLatest,
  BehaviorSubject,
  throwError,
  Subject,
  merge,
  of
} from 'rxjs';
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class DeclarativePostsService {
  private apiUrl = 'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/posts.json';

  // Subjects
  private selectedPostSubject = new BehaviorSubject<string | null>(null);
  selectedPostActions$ = this.selectedPostSubject.asObservable();

  private postCRUDSubject = new Subject<CRUDAction<IPost>>();
  postCRUDAction$ = this.postCRUDSubject.asObservable();

  // Streams
  posts$: Observable<IPost[]>;
  postsWithCategory$: Observable<IPost[]>;
  selectedPost$: Observable<IPost | null>;
  allPost$: Observable<IPost[]>;

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {
    // Initial posts fetch
    this.posts$ = this.getPosts();

    // Posts with category titles
    this.postsWithCategory$ = combineLatest([
      this.posts$,
      this.categoryService.getCategories()
    ]).pipe(
      map(([posts, categories]) =>
        posts.map(post => ({
          ...post,
          categoryName: categories.find(c => c.id === post.categoryId)?.title || ''
        }))
      ),
      shareReplay(1),
      catchError(this.handleError)
    );

    // Selected post stream
    this.selectedPost$ = combineLatest([
      this.postsWithCategory$,
      this.selectedPostActions$
    ]).pipe(
      delay(200), // 2000ms felt too high, you can adjust
      map(([posts, selectedPostId]) =>
        posts.find(post => post.id === selectedPostId) || null
      ),
      shareReplay(1),
      catchError(this.handleError)
    );

    // Combine original posts with dynamically added ones
    this.allPost$ = merge(
      this.postsWithCategory$,
      this.postCRUDAction$.pipe(
        concatMap((postAction) => this.savePosts(postAction)) // returns Observable<IPost>
      )
    ).pipe(
      scan((posts, value) => this.modifyPosts(posts, value), [] as IPost[])
    );
  }

  // Fix: correctly handle array vs single post
  private modifyPosts(posts: IPost[], value: IPost | IPost[]): IPost[] {
    if (Array.isArray(value)) {
      // Initial load from Firebase
      return value;
    } else {
      // CRUD updates
      return [...posts, value];
    }
  }

  // Handle save actions
private savePosts(postAction: CRUDAction<IPost>): Observable<IPost> {
  if (postAction.action === 'add') {
    return this.addPostToServer(postAction.data).pipe(
      concatMap((post) =>
        this.categoryService.getCategories().pipe(
          map((categories: { id: string; title: string }[]) => {
            const category = categories.find(
              (category) => category.id === post.categoryId
            );
            return {
              ...post,
              categoryTitle: category?.title || ''
            };
          })
        )
      )
    );
  }
  return of(postAction.data);
}



  // Save a post to Firebase
  private addPostToServer(post: IPost): Observable<IPost> {
    return this.http.post<{ name: string }>(this.apiUrl, post).pipe(
      map((response) => ({
        ...post,
        id: response.name,
      })),
      catchError(this.handleError)
    );
  }

  // Add new post and emit via Subject
  addPost(post: IPost): void {
    this.addPostToServer(post).subscribe((newPost: IPost) => {
      this.postCRUDSubject.next({ action: 'add', data: newPost });
    });
  }

  // Select post by ID
  selectPost(postId: string): void {
    this.selectedPostSubject.next(postId);
  }

  // Fetch posts from Firebase
  private getPosts(): Observable<IPost[]> {
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
      catchError(this.handleError),
      shareReplay(1)
    );
  }

  // Error handler
  private handleError(error: any) {
    console.error('Error fetching posts:', error);
    return throwError(() => new Error('Failed to fetch posts'));
  }
}
