import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { AuthGuard } from '@services/auth.guard.service';

import { ConfigComponent } from './config.component';
import { SkudComponent } from './skud/skud.component';

const routing = RouterModule.forChild([
  { path: '', component: ConfigComponent,
    children: [{ path: 'skud', component: SkudComponent, canActivate: [AuthGuard] }],
    canActivate: [AuthGuard],
  },
]);

@NgModule({
  declarations: [ConfigComponent, SkudComponent],
  imports: [
    CommonModule,
    ClarityModule,
    routing,
  ],
})
export class ConfigModule { }
