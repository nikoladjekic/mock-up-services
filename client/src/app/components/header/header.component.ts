import { Component, OnInit } from '@angular/core';
import { MockUpService } from 'src/app/services/mock-up.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  allPostsArr: Array<Post> = [];
  searchResults: Array<Post> = [];
  searchTerm: string;

  constructor(private _service: MockUpService) {}

  ngOnInit(): void {
    this.allPostsArr = [];
    this._service.getPosts().subscribe((posts) => {
      this.allPostsArr = posts;
    });
  }

  search(term): void {
    this.searchResults = [];
    this.allPostsArr.forEach((post) => {
      if (post.title.includes(term)) {
        this.searchResults.push(post);
      }
    });
  }

  exitSearch(): void {
    this.searchTerm = '';
  }
}
