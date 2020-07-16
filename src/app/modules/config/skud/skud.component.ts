import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import {ClrDatagridSortOrder} from '@clr/angular';

import { IEmployeeResponse } from '@models/employee.model';

@Component({
  selector: 'app-skud',
  templateUrl: './skud.component.html',
  styleUrls: ['./skud.component.scss'],
})
export class SkudComponent implements  OnInit {

  public emp$: Observable<IEmployeeResponse>;
  public descSort = ClrDatagridSortOrder.DESC;

  constructor(private http: HttpClient) {
  }

  public ngOnInit() {
    this.emp$ = this.getAllEmp();
  }

  private getAllEmp() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
    };
    return this.http.get<IEmployeeResponse>('http://172.20.4.195:3000/api/employee', httpOptions);
  }

}
