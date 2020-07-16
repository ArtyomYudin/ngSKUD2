import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule } from '@angular/router';

import { SplitlastPipe } from '@pipe/splitlast.pipe';
import { Blobtobase64Pipe } from '@pipe/blobtobase64.pipe';
import { BuildingnamePipe } from '@pipe/buildingname.pipe';
import { DatetimeformatPipe } from '@pipe/datetimeformat.pipe';

import { SkudDashboardComponent } from '@modules/skuddashboard/skuddashboard.component';
import { CameraComponent } from '@modules/skuddashboard/camera/camera.component';
import { EmployeeComponent } from '@modules/skuddashboard/employee/employee.component';
import { EmployeeSearchComponent } from '@modules/skuddashboard/employeesearch/employeesearch.component';
import { LasttenComponent } from '@modules/skuddashboard/lastten/lastten.component';
import { VisitorsComponent } from '@modules/skuddashboard/visitors/visitors.component';
import { VisitorsChartComponent } from '@modules/skuddashboard/visitorschart/visitorschart.component';
import { WebsocketService } from '@app/services/websocket.service';

const routing = RouterModule.forChild([
  { path: '', component: SkudDashboardComponent },
  ]);

@NgModule({
  declarations: [
    SplitlastPipe, Blobtobase64Pipe, BuildingnamePipe, DatetimeformatPipe,
    SkudDashboardComponent, CameraComponent, EmployeeComponent,
    EmployeeSearchComponent, LasttenComponent, VisitorsComponent,
    VisitorsChartComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    routing,
  ],
  providers: [WebsocketService],
})
export class SkudDashboardModule { }
