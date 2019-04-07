// сервис для поиска сотрудников

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

import { Employee, IEmployeeResponse } from '@models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // public findEmpSubject: BehaviorSubject<any>;
  // public findEmp: Observable<any>;

  constructor(private http: HttpClient) {
    // this.findEmpSubject = new BehaviorSubject<Employee>(null);
    // this.findEmp = this.findEmpSubject.asObservable();
  }

  public getFindEmp(empId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
    };

    return this.http.post<Employee>('http://172.20.4.195:3000/api/employee', { empId }, httpOptions)
      .pipe(
        map(currentEmp => currentEmp),
      );
  }

  public getAllEmp(filter: {name: string} = { name: '' }, page = 1): Observable<IEmployeeResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
    };
    return this.http.get<IEmployeeResponse>('http://172.20.4.195:3000/api/employee', httpOptions)
    .pipe(
      tap((response: IEmployeeResponse) => {
        response.results = response.results
          .map(user => user)
          .filter(user => user.lastName.toLowerCase().startsWith(filter.name.toLowerCase()));
        return response;
      }),
      );
  }

}
