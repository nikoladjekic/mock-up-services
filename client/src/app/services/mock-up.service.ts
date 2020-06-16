import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class MockUpService {
  url: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private _http: HttpClient) {}

  getPosts() {
    return this._http.get<Array<Post>>(this.url);
  }
}
