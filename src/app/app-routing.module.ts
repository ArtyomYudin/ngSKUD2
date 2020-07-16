import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@services/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/skud', pathMatch: 'full' },
  { path: 'skud', loadChildren: () => import('./modules/skuddashboard/skuddashboard.module').then(m => m.SkudDashboardModule),
    canActivate: [AuthGuard],  data: {key: 'cached'} },
  // { path: 'monitoring', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'config', loadChildren: () => import('./modules/config/config.module').then(m => m.ConfigModule),
    canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
