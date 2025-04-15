import { createAction, props } from '@ngrx/store';
import { Instrumento } from '../models/instrumento.model';

// Load Instrumentos
export const loadInstrumentos = createAction('[Instrumentos] Load Instrumentos');
export const loadInstrumentosSuccess = createAction('[Instrumentos] Load Instrumentos Success', props<{ instrumentos: Instrumento[] }>());
export const loadInstrumentosFailure = createAction('[Instrumentos] Load Instrumentos Failure', props<{ error: any }>());

// Create Instrumento
export const createInstrumento = createAction('[Instrumentos] Create Instrumento', props<{ instrumento: Instrumento }>());
export const createInstrumentoSuccess = createAction('[Instrumentos] Create Instrumento Success', props<{ instrumento: Instrumento }>());
export const createInstrumentoFailure = createAction('[Instrumentos] Create Instrumento Failure', props<{ error: any }>());

// Update Instrumento
export const updateInstrumento = createAction('[Instrumentos] Update Instrumento', props<{ instrumento: Instrumento }>());
export const updateInstrumentoSuccess = createAction('[Instrumentos] Update Instrumento Success', props<{ instrumento: Instrumento }>());
export const updateInstrumentoFailure = createAction('[Instrumentos] Update Instrumento Failure', props<{ error: any }>());

// Delete Instrumento
export const deleteInstrumento = createAction('[Instrumentos] Delete Instrumento', props<{ id: number }>());
export const deleteInstrumentoSuccess = createAction('[Instrumentos] Delete Instrumento Success', props<{ id: number }>());
export const deleteInstrumentoFailure = createAction('[Instrumentos] Delete Instrumento Failure', props<{ error: any }>());