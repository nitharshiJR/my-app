import { Component } from '@angular/core';
import { DeclarativePostsService } from '../Declarativeposts.service';
import { Observable } from 'rxjs';
import { IPost } from '../Ipost';

@Component({
  selector: 'app-alt-pages',
  templateUrl: './alt-pages.component.html',
  styleUrls: ['./alt-pages.component.scss']
})
export class AltPagesComponent {

  posts$: Observable<IPost[]>;       // declare only
  selectedPost$: Observable<IPost | null>; // declare only

  constructor(private declarativeposts: DeclarativePostsService) {
    this.posts$ = this.declarativeposts.postsWithCategory$; 
    this.selectedPost$ = this.declarativeposts.selectedPost$;
  }

  onSelectPost(post: IPost, event: Event) {
    event.preventDefault();
    if (post.id) {                  // safe check for id
      this.declarativeposts.selectPost(post.id);
    }
  }
}

