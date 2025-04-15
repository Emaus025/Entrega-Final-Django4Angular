import { Routes } from '@angular/router';
import { Crud1Component } from './crud1/crud1.component';
import { PartiturasComponent } from './partituras/partituras.component';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { EnsamblesComponent } from './ensambles/ensambles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'partituras', pathMatch: 'full' },
  { path: 'crud1', component: Crud1Component },
  { path: 'partituras', component: PartiturasComponent },
  { path: 'instrumentos', component: InstrumentosComponent },
  { path: 'ensambles', component: EnsamblesComponent }
];
