import { createAction, props } from '@ngrx/store';
import { Ensamble } from '../models/ensamble.model';

export const loadEnsambles = createAction('[Ensambles] Load Ensambles');
export const loadEnsamblesSuccess = createAction('[Ensambles] Load Ensambles Success', props<{ ensambles: Ensamble[] }>());
export const loadEnsamblesFailure = createAction('[Ensambles] Load Ensambles Failure', props<{ error: any }>());

export const createEnsamble = createAction('[Ensambles] Create Ensamble', props<{ ensamble: Ensamble }>());
export const createEnsambleSuccess = createAction('[Ensambles] Create Ensamble Success', props<{ ensamble: Ensamble }>());
export const createEnsambleFailure = createAction('[Ensambles] Create Ensamble Failure', props<{ error: any }>());

export const updateEnsamble = createAction('[Ensambles] Update Ensamble', props<{ ensamble: Ensamble }>());
export const updateEnsambleSuccess = createAction('[Ensambles] Update Ensamble Success', props<{ ensamble: Ensamble }>());
export const updateEnsambleFailure = createAction('[Ensambles] Update Ensamble Failure', props<{ error: any }>());

export const deleteEnsamble = createAction('[Ensambles] Delete Ensamble', props<{ id: number }>());
export const deleteEnsambleSuccess = createAction('[Ensambles] Delete Ensamble Success', props<{ id: number }>());
export const deleteEnsambleFailure = createAction('[Ensambles] Delete Ensamble Failure', props<{ error: any }>());