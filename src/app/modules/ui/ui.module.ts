import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { LayoutComponent } from '@modules/ui/layout/layout.component';
import { HeaderComponent } from '@modules/ui/layout/header/header.component';
import { MainComponent } from '@modules/ui/layout/main/main.component';
import { AboutModule } from '@modules/about/about.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    AboutModule,
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class UiModule { }
