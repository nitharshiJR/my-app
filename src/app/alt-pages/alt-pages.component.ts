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
  showAddPost = false;

  // Observables
  posts$: Observable<IPost[]>;
  selectedPost$: Observable<IPost | null>;

  // Model for new post
  newPost: IPost = {
    title: '',
    categoryId: '',
    description: ''
  };

  constructor(private declarativeposts: DeclarativePostsService) {
    // Use allPost$ so newly added posts also appear
    this.posts$ = this.declarativeposts.allPost$;
    this.selectedPost$ = this.declarativeposts.selectedPost$;
  }

  // Select a post
  onSelectPost(post: IPost, event: Event) {
    event.preventDefault();
    this.showAddPost = false;
    if (post.id) {
      this.declarativeposts.selectPost(post.id);
    }
  }

  // Show Add Post form
  onAddPost() {
    this.showAddPost = true;
  }

  // Submit new post

}
