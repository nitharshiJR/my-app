import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { IPost } from '../Ipost';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: false, // This is not a standalone component
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush change detection strategy
})
export class PostsComponent  implements OnInit, OnDestroy {
  posts: IPost[] = [];
  postsSubscription!: Subscription;
intervalSubscription!: Subscription;

  constructor(private postService: PostService/*private ref:ChangeDetectorRef*/ ) {}

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts() {
    this.intervalSubscription=interval(1000).subscribe({
      next: (data) => {
        
    },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Interval completed');
      }
    
    });

  this.postsSubscription = this.postService.getPostsWithCategory()
  .subscribe({
    next: (posts: any) => {
      this.posts = posts;
      console.log(posts);
      
    },
    error: (error) => {
      console.error('Error fetching posts:', error);
    },
    complete: () => {
      console.log('Posts fetching completed');
    }
  });
  }

  ngOnDestroy() {
   this.postsSubscription&& this.postsSubscription.unsubscribe();
   this.intervalSubscription && this.intervalSubscription.unsubscribe();
    // Unsubscribe from the posts subscription to prevent memory leaks
   
  }
}
