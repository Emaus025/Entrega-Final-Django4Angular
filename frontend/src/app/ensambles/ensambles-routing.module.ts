import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnsamblesComponent } from './ensambles.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnsamblesRoutingModule { }
