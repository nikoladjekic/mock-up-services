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

  allPostsArr: Array<Post> = [];
  scrollArr: Array<Post> = [];

  editThisPost: Post;
  searchTerm: string;
  page: number = 1;

  constructor(
    private _service: MockUpService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadEverything();
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
    const postToRemove = this.scrollArr.indexOf(post);
    if (postToRemove > -1) {
      this.scrollArr.splice(postToRemove, 1);
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
      this.scrollArr.unshift(resp);
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
      this.scrollArr.unshift(resp);

      this._spinner.hide();
      this.successEdit = true;
    });
  }

  onScroll() {
    this.getTenPosts();
  }

  // since we don't have option to send new query with page number
  // here is a custom function to get the next ten posts on scroll
  getTenPosts(): void {
    this.allPostsArr.forEach((post) => {
      if (post.userId === this.page) {
        this.scrollArr.push(post);
      }
    });
    this.page++;
  }

  loadEverything(): void {
    this._spinner.show();
    this.loadAllPosts();
    setTimeout(() => {
      this.getTenPosts();
      this._spinner.hide();
    }, 500);
  }
}
