import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userSrvc: UserService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if(this._userSrvc.getLoggedInUser()) this._router.navigate(['/posts'])
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login(): void {
    if (this.loginForm.invalid)
      return;

    this._userSrvc.getUser(this.loginForm.value.email)
      .then((res: any) => {
        if (res.length == 0) this._snackBar.open('Account does not exist', 'ok', { duration: 3000 });
        else {
          if (res[0].password === this.loginForm.value.password) {
            this._snackBar.open('Login successful', 'ok', { duration: 3000 });
            this._userSrvc.setLoginUser(res[0]);
            // localStorage.setItem('user',JSON.stringify(res[0]))
            this._router.navigate(['/posts']);

          } else {
            this._snackBar.open('Account password incorrect', 'ok', { duration: 3000 });
          }
        }
      })
      .catch(console.log);

    // this.loginForm.reset();
  }




}
