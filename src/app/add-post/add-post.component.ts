import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeclarativeCategoryService } from '../DeclarativeCategory.service';
import { DeclarativePostsService } from '../Declarativeposts.service';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)
  });

  categories$!: any;

  // new properties
  newPost = { title: '', categoryId: '', description: '' };
  showAddPost = true; // default form visible

  constructor(
    private categoryService: DeclarativeCategoryService, 
    private postService: DeclarativePostsService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.categories$; 
  }

  onsubmit() {
  const formValue = this.postForm.value;
  this.newPost = {
    title: formValue.title || '',
    categoryId: formValue.categoryId || '',
    description: formValue.description || ''
  };

  this.postService.addPost(this.newPost);

  this.postForm.reset();
  this.showAddPost = false;
}

}
