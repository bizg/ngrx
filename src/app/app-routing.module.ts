import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    loadChildren: () => import('./feature/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
  // { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
