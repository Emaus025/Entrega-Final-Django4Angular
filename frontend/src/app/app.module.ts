import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { EnsamblesModule } from './ensambles/ensambles.module';
import { HttpClientModule } from '@angular/common/http';
import { ensambleReducer } from './ensambles/store/ensambles.reducer';
import { crud1Reducer } from './crud1/store/crud1.reducer';
import { instrumentosReducer } from './instrumentos/store/instrumentos.reducer';
import { DatabaseSeederService } from './services/database-seeder.service';
import { SeedDatabaseComponent } from './components/seed-database/seed-database.component';

@NgModule({
  declarations: [
    AppComponent,
    SeedDatabaseComponent // Add this line
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      ensambles: ensambleReducer,
      crud1: crud1Reducer,
      instrumentos: instrumentosReducer
    }),
    EnsamblesModule
  ],
  providers: [DatabaseSeederService],
  bootstrap: [AppComponent]
})
export class AppModule { }