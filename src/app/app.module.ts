import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { metaReducers, reducers } from './app-state';
import { TaskEffect } from './app-state/effects/task.effect';
import { UserEffect } from './app-state/effects/user.effect';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './feature/login/login.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    DashboardModule,
    LoginModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([UserEffect, TaskEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
