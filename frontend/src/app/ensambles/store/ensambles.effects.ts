import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EnsamblesService } from '../services/ensambles.service';
import * as EnsamblesActions from './ensambles.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class EnsamblesEffects {
  loadEnsambles$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(EnsamblesActions.loadEnsambles)).subscribe(() => {
        this.ensamblesService.getEnsambles().subscribe({
          next: (ensambles) => {
            observer.next(EnsamblesActions.loadEnsamblesSuccess({ ensambles }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error loading ensambles:', error);
            observer.next(EnsamblesActions.loadEnsamblesFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  createEnsamble$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(EnsamblesActions.createEnsamble)).subscribe((action) => {
        this.ensamblesService.createEnsamble(action.ensamble).subscribe({
          next: (ensamble) => {
            observer.next(EnsamblesActions.createEnsambleSuccess({ ensamble }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error creating ensamble:', error);
            observer.next(EnsamblesActions.createEnsambleFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  updateEnsamble$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(EnsamblesActions.updateEnsamble)).subscribe((action) => {
        this.ensamblesService.updateEnsamble(action.ensamble).subscribe({
          next: (ensamble) => {
            observer.next(EnsamblesActions.updateEnsambleSuccess({ ensamble }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error updating ensamble:', error);
            observer.next(EnsamblesActions.updateEnsambleFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  deleteEnsamble$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(EnsamblesActions.deleteEnsamble)).subscribe((action) => {
        this.ensamblesService.deleteEnsamble(action.id).subscribe({
          next: () => {
            observer.next(EnsamblesActions.deleteEnsambleSuccess({ id: action.id }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error deleting ensamble:', error);
            observer.next(EnsamblesActions.deleteEnsambleFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(
    private actions$: Actions,
    private ensamblesService: EnsamblesService
  ) {}
}