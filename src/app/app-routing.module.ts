import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PucharseComponent} from './pucharse/pucharse.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch:"full"},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pucharse/:id', component: PucharseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
