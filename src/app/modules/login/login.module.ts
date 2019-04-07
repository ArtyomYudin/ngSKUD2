import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routing = RouterModule.forChild([
  { path: '', component: LoginComponent },
  ]);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    routing,
  ],
})
export class LoginModule { }
