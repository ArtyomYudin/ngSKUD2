import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SessionCheckService {

  public isActivate: BehaviorSubject<any>;
  public isActivateStatus: Observable<any>;

  constructor(private jwtHelper: JwtHelperService) {
    this.isActivate = new BehaviorSubject<any>(localStorage.getItem('ngSKUD') ? true : false);
    this.isActivateStatus = this.isActivate.asObservable()
        .pipe(tap(this.validate.bind(this)));
  }

  private validate() {
    const validateInterval = setInterval(() => {
      this.isActivate.next(localStorage.getItem('ngSKUD') ? !this.jwtHelper.isTokenExpired() : null);
    // tslint:disable-next-line:align
    }, 60000);
    return () => {
      console.log('source disposed');
      clearInterval(validateInterval);
    };
  }
}
