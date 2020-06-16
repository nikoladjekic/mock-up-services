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
  errorMessage: boolean = false;

  allPostsArr: Array<Post> = [];
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
    });
    this._spinner.hide();
  }

  // delete a post from the array
  deletePost(post): void {
    const postToRemove = this.allPostsArr.indexOf(post);
    if (postToRemove > -1) {
      this.allPostsArr.splice(postToRemove, 1);
    }
  }

  // add new post
  onSubmit(post): void {
    this.successMessage = true;
    let newPost: Post = new Post(post.userId, post.id, post.title, post.body);
    this.allPostsArr.unshift(newPost);
    setTimeout(() => {
      this.successMessage = false;
    }, 2000);
  }
}
