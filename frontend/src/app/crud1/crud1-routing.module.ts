import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Crud1Component } from './crud1.component';

const routes: Routes = [{ path: '', component: Crud1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Crud1RoutingModule { }
