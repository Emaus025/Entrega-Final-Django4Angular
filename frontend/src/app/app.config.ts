import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { crud1Reducer } from './crud1/store/crud1.reducer';
import { Crud1Effects } from './crud1/store/crud1.effects';
import { partiturasReducer } from './partituras/store/partituras.reducer';
import { PartiturasEffects } from './partituras/store/partituras.effects';
import { instrumentosReducer } from './instrumentos/store/instrumentos.reducer';
import { InstrumentosEffects } from './instrumentos/store/instrumentos.effects';
import { ensamblesReducer } from './ensambles/store/ensambles.reducer';
import { EnsamblesEffects } from './ensambles/store/ensambles.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  
    provideStore({
      crud1_usuario: crud1Reducer,
      partituras: partiturasReducer,
      instrumentos: instrumentosReducer,
      ensambles: ensamblesReducer
    }),
    provideEffects(
      Crud1Effects,
      PartiturasEffects,
      InstrumentosEffects,
      EnsamblesEffects
    ),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};
