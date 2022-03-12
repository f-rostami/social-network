import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(
    private _userSrvc: UserService,
    private _router:Router
    ) { }

  ngOnInit(): void {
    if (!this._userSrvc.getLoggedInUser()) {
      this._router.navigate(['/login'])
    }
  }

}
