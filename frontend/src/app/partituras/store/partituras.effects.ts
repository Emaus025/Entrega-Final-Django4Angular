import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as PartiturasActions from './partituras.actions';
import { PartiturasService } from '../services/partituras.service';

@Injectable()
export class PartiturasEffects {
  loadPartituras$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(PartiturasActions.loadPartituras)).subscribe(() => {
        this.partiturasService.getPartituras().subscribe({
          next: (partituras) => {
            observer.next(PartiturasActions.loadPartiturasSuccess({ partituras }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error loading partituras:', error);
            observer.next(PartiturasActions.loadPartiturasFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  createPartitura$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(PartiturasActions.createPartitura)).subscribe((action) => {
        console.log('Effect: Creating partitura:', action.partitura);
        this.partiturasService.createPartitura(action.partitura).subscribe({
          next: (partitura) => {
            console.log('Effect: Partitura created successfully:', partitura);
            observer.next(PartiturasActions.createPartituraSuccess({ partitura }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error creating partitura:', error);
            observer.next(PartiturasActions.createPartituraFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  updatePartitura$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(PartiturasActions.updatePartitura)).subscribe((action) => {
        console.log('Effect: Updating partitura:', action.partitura);
        this.partiturasService.updatePartitura(action.partitura).subscribe({
          next: (partitura) => {
            console.log('Effect: Partitura updated successfully:', partitura);
            observer.next(PartiturasActions.updatePartituraSuccess({ partitura }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error updating partitura:', error);
            observer.next(PartiturasActions.updatePartituraFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  deletePartitura$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(PartiturasActions.deletePartitura)).subscribe((action) => {
        console.log('Effect: Deleting partitura with ID:', action.id);
        this.partiturasService.deletePartitura(action.id).subscribe({
          next: () => {
            console.log('Effect: Partitura deleted successfully');
            observer.next(PartiturasActions.deletePartituraSuccess({ id: action.id }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error deleting partitura:', error);
            observer.next(PartiturasActions.deletePartituraFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(
    private actions$: Actions,
    private partiturasService: PartiturasService
  ) {}
}