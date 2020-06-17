import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class MockUpService {
  url: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private _http: HttpClient) {}

  // methods that are used
  getPosts() {
    return this._http.get<Array<Post>>(this.url);
  }

  addNewPost(newPost) {
    return this._http.post<any>(this.url, newPost, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  }

  updatePost(updatedPost) {
    return this._http.put<any>(this.url + '/1', updatedPost, {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  }

  // other methods that could be used, but are not working correctly,
  // so i replicated them inside home component over an array that we get
  deletePost() {
    return this._http.delete<any>(this.url + '/1');
  }
}
