import { createAction, props } from '@ngrx/store';
import { Partitura } from '../models/partitura.model';

// Load Partituras
export const loadPartituras = createAction('[Partituras] Load Partituras');
export const loadPartiturasSuccess = createAction('[Partituras] Load Partituras Success', props<{ partituras: Partitura[] }>());
export const loadPartiturasFailure = createAction('[Partituras] Load Partituras Failure', props<{ error: any }>());

// Create Partitura
export const createPartitura = createAction('[Partituras] Create Partitura', props<{ partitura: Partitura }>());
export const createPartituraSuccess = createAction('[Partituras] Create Partitura Success', props<{ partitura: Partitura }>());
export const createPartituraFailure = createAction('[Partituras] Create Partitura Failure', props<{ error: any }>());

// Update Partitura
export const updatePartitura = createAction('[Partituras] Update Partitura', props<{ partitura: Partitura }>());
export const updatePartituraSuccess = createAction('[Partituras] Update Partitura Success', props<{ partitura: Partitura }>());
export const updatePartituraFailure = createAction('[Partituras] Update Partitura Failure', props<{ error: any }>());

// Delete Partitura
export const deletePartitura = createAction('[Partituras] Delete Partitura', props<{ id: number }>());
export const deletePartituraSuccess = createAction('[Partituras] Delete Partitura Success', props<{ id: number }>());
export const deletePartituraFailure = createAction('[Partituras] Delete Partitura Failure', props<{ error: any }>());