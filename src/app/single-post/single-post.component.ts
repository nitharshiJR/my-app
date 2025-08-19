import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPost } from '../Ipost';
import { DeclarativePostsService } from '../Declarativeposts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  errorMessage='';
  post$!: Observable<IPost | null>;
  

  private selectedPost = new BehaviorSubject<IPost | null>(null);

  constructor(private postService: DeclarativePostsService) {}

  ngOnInit(): void {
    this.post$ = this.postService.selectedPost$; 
  }

  onPostClick(postId: string) {
  this.post$ = this.postService.posts$.pipe(
    
    map(posts => posts.find(p => p.id == postId) || null)
  );
}

}
