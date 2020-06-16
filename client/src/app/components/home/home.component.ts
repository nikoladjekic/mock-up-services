import { Component, OnInit } from '@angular/core';

import { MockUpService } from 'src/app/services/mock-up.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allPostsArr: Array<Post> = [];
  searchTerm: string;

  constructor(private _service: MockUpService) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  // load the list of all posts
  loadAllPosts(): void {
    this.allPostsArr = [];
    this._service.getPosts().subscribe((posts) => {
      this.allPostsArr = posts;
    });
  }

  // delete a post from the array
  deletePost(post): void {
    const postToRemove = this.allPostsArr.indexOf(post);
    if (postToRemove > -1) {
      this.allPostsArr.splice(postToRemove, 1);
    }
  }
}
