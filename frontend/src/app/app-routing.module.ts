import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'crud1', loadChildren: () => import('./crud1/crud1.module').then(m => m.Crud1Module) },
  { path: 'partituras', loadChildren: () => import('./partituras/partituras.module').then(m => m.PartiturasModule) },
  { path: 'instrumentos', loadChildren: () => import('./instrumentos/instrumentos.module').then(m => m.InstrumentosModule) },
  { path: 'ensambles', loadChildren: () => import('./ensambles/ensambles.module').then(m => m.EnsamblesModule) },
  { path: '', redirectTo: '/partituras', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }