import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private _userSrvc: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._userSrvc.logout();
    this._router.navigate(['/login'])
  }

}
