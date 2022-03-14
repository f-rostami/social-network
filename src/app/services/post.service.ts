import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _httpClient: HttpClient) { }

  saveNewPost(postObj: IPost) {
    return new Promise(
      (resolve, reject) => {
        this._httpClient.post(`http://localhost:3000/posts`, postObj)
          .subscribe({
            next: res => resolve(res),
            error: err => reject(err)
          })
      }
    )
  }

  getPosts() {
    return new Promise(
      (resolve, reject) => {
        this._httpClient.get(`http://localhost:3000/posts`)
          .subscribe({
            next: res => resolve(res),
            error: err => reject(err)
          })
      }
    )
  }

  updatePost(postObj: IPost) {
    return new Promise(
      (resolve, reject) => {
        this._httpClient.put(`http://localhost:3000/posts/${postObj.id}`, postObj)
          .subscribe({
            next: res => resolve(res),
            error: err => reject(err)
          })
      }
    )
  }

}
