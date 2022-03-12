import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userSrvc: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createAccountForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    })
  }

  createAccount() {
    if (this.createAccountForm.invalid) return;
    this._userSrvc.createNewUser(this.createAccountForm.value)
      .then((res: any) => {
        this._userSrvc.setLoginUser(res);
        this._router.navigate(['/posts']);
      })
      .catch(console.log);
  }

}
