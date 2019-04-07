import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WebsocketService } from '@services/websocket.service';
import { Event } from '@services/websocket.service.event';

export interface IEvent {
  lname: string;
  fname: string;
  mname: string;
  tstamp: string;
  apoint_id: number;
  photo: ArrayBuffer;
}

@Component({
  selector: 'app-lastten',
  templateUrl: './lastten.component.html',
  styleUrls: ['./lastten.component.scss'],
})

export class LasttenComponent implements OnDestroy, OnInit {
  // public lastEntryArray$: any = [];
  // public lastExitArray: any = [];
  public lastEntryArray$: Observable<IEvent>;
  public lastExitArray$: Observable<IEvent>;
  // private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private wsService: WebsocketService) {
    function apuf(marr: any[], data: any) {
      if (marr.length === 10) {
        marr.shift();
        marr.push(data);
      } else { marr.push(data); }
      return marr;
    }
    // this._WebsocketService.onMessage(Event.EV_ENTRY)
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(data => apuf(this.lastEntryArray, data));

    // this._WebsocketService.onMessage(Event.EV_EXIT)
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //  .subscribe(data => apuf(this.lastExitArray, data));
  }

  public ngOnInit() {
    this.lastEntryArray$ = this.wsService.on<IEvent>(Event.EV_ENTRY);
    this.lastExitArray$ = this.wsService.on<IEvent>(Event.EV_EXIT);
  }

  public ngOnDestroy() {
    // this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
  }

}
