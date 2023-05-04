import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [DashboardComponent, TasksComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule
  ],
  providers: [
    BsModalService
  ]
})
export class DashboardModule { }
