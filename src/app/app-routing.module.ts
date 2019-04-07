import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@services/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/skud', pathMatch: 'full' },
  { path: 'skud', loadChildren: './modules/skuddashboard/skuddashboard.module#SkudDashboardModule',
    canActivate: [AuthGuard],  data: {key: 'cached'} },
  // { path: 'monitoring', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
