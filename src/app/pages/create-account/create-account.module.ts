import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CreateAccountComponent
    }]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CreateAccountComponent
  ]
})
export class CreateAccountModule { }
