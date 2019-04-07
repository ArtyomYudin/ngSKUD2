import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { first } from 'rxjs/internal/operators/first';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { AuthenticationService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  public submitted = false;
  public loading = false;
  public error = '';
  public loginForm: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject();
  private returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
  ) {
      // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //  this.router.navigate(['/']);
    // }
  }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

      // reset login status
    this.authenticationService.logout();

      // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit() {
    this.submitted = true;

      // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
          .pipe(
            first(),
            takeUntil(this.ngUnsubscribe))
          .subscribe(
              () => {
                this.router.navigate([this.returnUrl]);
              }, error => {
                this.error = error;
                this.loading = false;
              });
  }
}
