import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { finalize } from 'rxjs/internal/operators/finalize';
import { first } from 'rxjs/internal/operators/first';

import { EmployeeService } from '@services/employee.service';
import { Employee } from '@models/employee.model';

import { WebsocketService } from '@services/websocket.service';

import { Event } from '@services/websocket.service.event';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-employeesearch',
  templateUrl: './employeesearch.component.html',
  styleUrls: ['./employeesearch.component.scss'],
})
export class EmployeeSearchComponent implements OnDestroy, OnInit {
  public currentEmp: Employee;
  public error = '';
  // emptyEmp = false;
  public isLoading = false;
  public empValue = '';
  public filteredEmployee: Employee[] = [];
  public showAutocomplete = false;
  public searchEmp: FormGroup;

  private ngUnsubscribe: Subject<any> = new Subject();
  private ngUnsubscribeEmp: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private wsService: WebsocketService) {
   // this.employeeService.findEmp.subscribe(x => this.currentEmp = x);
  }

  public ngOnInit() {
    this.searchEmp = this.formBuilder.group({
      emp: null,
    });

    this.searchEmp
      .get('emp')
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe),
       // tap(() => this.showAutocomplete = false),
        switchMap(value => value.length >= 3 ? this.employeeService.getAllEmp({ name: value }, 1)
        .pipe(
          finalize(() => this.showAutocomplete = true),
          ) : [],
        ),
      )
      .subscribe(users => this.filteredEmployee = users.results);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribeEmp.next();
    this.ngUnsubscribeEmp.complete();
  }

  get f() { return this.searchEmp.controls; }

  public onSubmit(id: number) {
    if (this.searchEmp.invalid) {
      return;
    }
    this.employeeService.getFindEmp(id)
              .pipe(
                first(),
                takeUntil(this.ngUnsubscribe))
              .subscribe(x => {
                    this.currentEmp = x;
                    this.error = null;
                    this.showAutocomplete = false;
                    /**
                     *  сделать подписку на конкретного пользователя для одновления  результата поиска
                     */
                    this.wsService.on<Employee>(Event.EV_EMPLOYEE)
                      .pipe(
                        takeUntil(this.ngUnsubscribeEmp),
                        filter(data => data.id === id),
                        )
                      .subscribe(data => this.currentEmp = data);
                  }, error => {
                    this.error = error;
                    this.currentEmp = null;
                    this.showAutocomplete = false;
                  });
  }

  public onChanges() {
    this.searchEmp.get('emp').valueChanges
    .pipe(
      takeUntil(this.ngUnsubscribe))
    .subscribe(value => {
      this.empValue = value;
      if (!value) {
        this.currentEmp = null;
        this.error = null;
        this.showAutocomplete = false;
        this.ngUnsubscribeEmp.next();
        this.ngUnsubscribeEmp.complete();
      }
    });
  }

  public displayFn(user: Employee) {
    if (user) { return `${user.lastName} ${user.firstName} ${user.middleName}`; }
  }
}
