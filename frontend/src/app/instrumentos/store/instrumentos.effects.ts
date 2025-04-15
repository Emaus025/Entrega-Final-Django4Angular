import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as InstrumentosActions from './instrumentos.actions';
import { InstrumentosService } from '../services/instrumentos.service';

@Injectable()
export class InstrumentosEffects {
  loadInstrumentos$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(InstrumentosActions.loadInstrumentos)).subscribe(() => {
        this.instrumentosService.getInstrumentos().subscribe({
          next: (instrumentos) => {
            observer.next(InstrumentosActions.loadInstrumentosSuccess({ instrumentos }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error loading instrumentos:', error);
            observer.next(InstrumentosActions.loadInstrumentosFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  createInstrumento$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(InstrumentosActions.createInstrumento)).subscribe((action) => {
        console.log('Effect: Creating instrumento:', action.instrumento);
        this.instrumentosService.createInstrumento(action.instrumento).subscribe({
          next: (instrumento) => {
            console.log('Effect: Instrumento created successfully:', instrumento);
            observer.next(InstrumentosActions.createInstrumentoSuccess({ instrumento }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error creating instrumento:', error);
            observer.next(InstrumentosActions.createInstrumentoFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  updateInstrumento$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(InstrumentosActions.updateInstrumento)).subscribe((action) => {
        console.log('Effect: Updating instrumento:', action.instrumento);
        this.instrumentosService.updateInstrumento(action.instrumento).subscribe({
          next: (instrumento) => {
            console.log('Effect: Instrumento updated successfully:', instrumento);
            observer.next(InstrumentosActions.updateInstrumentoSuccess({ instrumento }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error updating instrumento:', error);
            observer.next(InstrumentosActions.updateInstrumentoFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  deleteInstrumento$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(InstrumentosActions.deleteInstrumento)).subscribe((action) => {
        console.log('Effect: Deleting instrumento with ID:', action.id);
        this.instrumentosService.deleteInstrumento(action.id).subscribe({
          next: () => {
            console.log('Effect: Instrumento deleted successfully');
            observer.next(InstrumentosActions.deleteInstrumentoSuccess({ id: action.id }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error deleting instrumento:', error);
            observer.next(InstrumentosActions.deleteInstrumentoFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(
    private actions$: Actions,
    private instrumentosService: InstrumentosService
  ) {}
}