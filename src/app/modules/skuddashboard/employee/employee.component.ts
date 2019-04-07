import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebsocketService } from '@services/websocket.service';

import { Event } from '@services/websocket.service.event';

export interface IEvent {
  lname: string;
  fname: string;
  mname: string;
  tstamp: string;
  apoint: string;
  photo: ArrayBuffer;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})

export class EmployeeComponent implements OnDestroy, OnInit {
  // public employeeArray: any = [];

  public employeeArray$: Observable<IEvent>;
  // private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private wsService: WebsocketService) {
  /*
    function apuf(marr, data: string) {
      if (marr.length === 10) {
        marr.shift();
        marr.push(data);
      } else { marr.push(data); }
      return marr;
    }
    */
/*
    function reCreateArray(sArray: Array<{ lname: string; }>, data: { lname: string; }) {
      if (sArray.length) {
        for (let i = sArray.length - 1; i >= 0; i -= 1) {
          if (sArray[i].lname === data.lname) {
            sArray.splice(i, 1);
          }
        }
      }
      return sArray.push(data);
      // console.log(data);
    }
    this._WebsocketService.onMessage(Event.EV_EMPLOYEE)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => reCreateArray(this.employeeArray, data));
  */
  }

  public ngOnInit() {
    this.employeeArray$ = this.wsService.on<IEvent>(Event.EV_EMPLOYEEUC);
  }

  public ngOnDestroy() {
    // this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
  }

}
