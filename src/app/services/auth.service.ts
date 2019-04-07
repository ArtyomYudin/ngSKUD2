import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUser } from '@models/authuser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<AuthUser>;
  private currentUserSubject: BehaviorSubject<AuthUser>;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('ngSKUD')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): AuthUser {
  //   return this.currentUserSubject.value;
  // }

  public login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
    };

    return this.http.post<AuthUser>('http://172.20.4.195:3000/api/auth', { email, password }, httpOptions)
            .pipe(map(authUser => {
              if (authUser && authUser.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('ngSKUD', JSON.stringify(authUser));
                this.currentUserSubject.next(authUser);
              }
              return authUser;
            }));
  }

  public logout() {
        // remove user from local storage to log user out
    localStorage.removeItem('ngSKUD');
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('ngSKUD')) {
    //  const token = JSON.parse(localStorage.getItem('ngSKUD')).token;
    // console.log(this.jwtHelper);
    return !this.jwtHelper.isTokenExpired();
    }
    return false;
  }
}
