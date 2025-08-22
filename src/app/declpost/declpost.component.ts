import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { IPost } from '../Ipost';
import { PostService } from '../post.service';
import { LoadService } from '../loadservice';

@Component({
  selector: 'app-declpost',
  standalone: false,
  templateUrl: './declpost.component.html',
  styleUrls: ['./declpost.component.scss'],
})
export class DeclpostComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  filteredPosts: IPost[] = [];
  categories: string[] = []; // store unique categories
  selectedCategory = ''; // selected value from dropdown

  postsSubscription!: Subscription;

  constructor(
    private postService: PostService,
    private loaderservice: LoadService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
    this.loaderservice.showLoader(); 
    },100);// show loader before fetching
    this.getPosts();
  }

  getPosts() {
    this.postsSubscription = this.postService
      .getPostsWithCategory()
      .pipe(
        finalize(() => {
          // ✅ runs after success or error, ensures loader is hidden
          this.loaderservice.hideLoader();
        })
      )
      .subscribe({
        next: (posts: IPost[]) => {
          this.posts = posts;
          this.filteredPosts = posts;

          // Extract unique category titles
          this.categories = [
            ...new Set(
              posts.map((post) => post.categoryTitle).filter((c): c is string => !!c)
            ),
          ];

          console.log('Posts:', this.posts);
          console.log('Categories:', this.categories);
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        },
      });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filteredPosts = category
      ? this.posts.filter((post) => post.categoryTitle === category)
      : this.posts;
  }

  ngOnDestroy() {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }
}
