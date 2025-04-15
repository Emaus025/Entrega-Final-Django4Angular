import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Crud1RoutingModule } from './crud1-routing.module';
import { Crud1Component } from './crud1.component';
import { StoreModule } from '@ngrx/store';
import * as fromCrud1 from './store/crud1.reducer';
import { Crud1Effects } from './store/crud1.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    Crud1Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Crud1RoutingModule,
    StoreModule.forFeature('crud1_usuario', fromCrud1.crud1Reducer),
    EffectsModule.forFeature([Crud1Effects])
  ]
})
export class Crud1Module { }
