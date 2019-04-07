import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Chart } from 'chart.js';
import { WebsocketService } from '@services/websocket.service';
import { Event } from '@services/websocket.service.event';
import { ChartsService } from '@services/charts.service';

@Component({
  selector: 'app-visitorschart',
  templateUrl: './visitorschart.component.html',
  styleUrls: ['./visitorschart.component.scss'],
})

export class VisitorsChartComponent implements OnDestroy, OnInit {
  @ViewChild('chart') public refChart: ElementRef;
  public chartData: any;

  // public employeePerDay$: Observable<number>;
  // public guestPerDay$: Observable<number>;

  private ngUnsubscribe: Subject<any> = new Subject();
  private employeeDay: any = [];
  private guestCount: any = [];
  private employeeCount: any = [];
  private guestChart: any;

  constructor(private wsService: WebsocketService,
              private chartsService: ChartsService) {
    Chart.defaults.global.defaultFontFamily = '\'Metropolis\',\'Avenir Next\',\'Helvetica Neue\',Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#adbbc4';
    Chart.defaults.global.defaultFontSize = 8;
    this.chartData = {};

    /*
    this._WebsocketService.onMessage(Event.EV_EMPLOYEE_PER_DAY)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.changeChartData(this.guestChart);
    });
    */

    this.wsService.on(Event.EV_GUEST_PER_DAY)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.changeChartData(this.guestChart);
      });
  }

  public ngOnInit() {
    this.initChart();
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initChart(): void {
    this.chartData = {
      labels: this.employeeDay,
      datasets: [{
        label: 'Гости',
        data: this.guestCount,
        borderColor: ['#AADB1E'],
        // backgroundColor: ['#AADB1E'],
        pointHoverBackgroundColor: '#AADB1E',
        fill: false,
        borderWidth: 1,
      },
      {
        label: 'Сотрудники',
        data: this.employeeCount,
        borderColor: ['#49AFD9'],
        // backgroundColor: ['#49AFD9'],
        pointHoverBackgroundColor: '#49AFD9',
        fill: false,
        borderWidth: 1,
      }],
    };
    const chart = this.refChart.nativeElement;
    const ctx = chart.getContext('2d');
    this.guestChart = new Chart(ctx, {
      type: 'line',
      data: this.chartData,
      options: {
        responsive: true,
        tooltips: {
         mode: 'index',
          intersect: true,
        },
        legend: {
          display: false,
        },
        elements: {
          line: {
            tension: 0, // disables bezier curves
          },
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true,
            stacked: false,
          }],
        },
      },
    });
  }

  private changeChartData(chart: any) {
    const chartLenght = chart.data.labels.length;
    for (let i = 0; i < chartLenght; ++i) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset: any) => {
        dataset.data.pop();
      });
    }
    // chart.update();
    this.getCartValues();
  }

  private getCartValues(): void {
    this.chartsService.getChartData('empAndGuest')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        const resultArray = Object.keys(x).map(i => (x as any)[i]);
        // console.log(resultArray);
        // let aI = (resultArray[0]>resultArray[1])?0:  1;
        resultArray[0].forEach((y: any) => {
          this.employeeDay.push(this.getOnlyDate(y.xAxes));
          this.employeeCount.push(y.yAxes);
        });
        resultArray[1].forEach((y: any) => {
          this.guestCount.push(y.yAxes);
        });
        this.guestChart.update();
      });
  }

  private getOnlyDate(dateString: string) {
    const fullDate = new Date(dateString);
    const date = fullDate.getDate();
    const month = fullDate.getMonth();
    return `${(date < 10) ? '0' + date : date}.${(month + 1 < 10) ? '0' + (month + 1) : (month + 1)}`;
  }

}
