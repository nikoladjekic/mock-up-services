import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { MockUpService } from 'src/app/services/mock-up.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  successMessage: boolean = false;
  successEdit: boolean = false;
  errorMessage: boolean = false;

  allPostsArr: Array<Post> = [];
  editThisPost: Post;
  searchTerm: string;

  constructor(
    private _service: MockUpService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  // load the list of all posts
  loadAllPosts(): void {
    this._spinner.show();
    this.allPostsArr = [];
    this._service.getPosts().subscribe((posts) => {
      this.allPostsArr = posts;
      this._spinner.hide();
    });
  }

  // remove specific post from the array
  deletePost(post): void {
    const postToRemove = this.allPostsArr.indexOf(post);
    if (postToRemove > -1) {
      this.allPostsArr.splice(postToRemove, 1);
    }
  }

  // add new post on top of the list
  onSubmit(post): void {
    this.successMessage = false;
    this._spinner.show();
    let newPost = {
      userId: post.userId,
      title: post.title,
      body: post.body,
    };
    this._service.addNewPost(newPost).subscribe((resp) => {
      this.allPostsArr.unshift(resp);
      this._spinner.hide();
      this.successMessage = true;
    });
  }

  // when user clicks on edit populate all fields with exiting data
  editPost(updatedPost): void {
    this.successEdit = false;
    this.editThisPost = updatedPost;
  }

  // when user confirms the changes
  confirmEdit(): void {
    this._spinner.show();
    this._service.updatePost(this.editThisPost).subscribe((resp) => {
      // with ng model we have already updated our data, but
      // for demonstration purposes we will remove old post, and then
      this.deletePost(this.editThisPost);
      // we will add to top of the list new post that we receive as a response
      this.allPostsArr.unshift(resp);

      this._spinner.hide();
      this.successEdit = true;
    });
  }
}
