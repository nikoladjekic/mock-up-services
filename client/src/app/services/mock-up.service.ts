import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockUpService {
  url: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private _http: HttpClient) {}

  getPosts() {
    return this._http.get<any>(this.url);
  }
}
