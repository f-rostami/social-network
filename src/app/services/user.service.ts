import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  createNewUser(data: IUser) {
    return new Promise((resolve, reject) => {
      this._http.post('http://localhost:3000/users', data).subscribe(
        {
          next: res => resolve(res),
          error: err => reject(err)
        }
      )
    })
  }
}
