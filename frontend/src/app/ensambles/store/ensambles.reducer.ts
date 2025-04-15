import { createReducer, on } from '@ngrx/store';
import { Ensamble } from '../models/ensamble.model';
import * as EnsamblesActions from './ensambles.actions';

export interface EnsamblesState {
  ensambles: Ensamble[];
  loading: boolean;
  error: any;
}

export const initialState: EnsamblesState = {
  ensambles: [],
  loading: false,
  error: null
};

export const ensamblesReducer = createReducer(
  initialState,
  on(EnsamblesActions.loadEnsambles, state => ({ ...state, loading: true })),
  on(EnsamblesActions.loadEnsamblesSuccess, (state, { ensambles }) => ({
    ...state,
    ensambles,
    loading: false
  })),
  on(EnsamblesActions.loadEnsamblesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(EnsamblesActions.createEnsambleSuccess, (state, { ensamble }) => ({
    ...state,
    ensambles: [...state.ensambles, ensamble]
  })),
  on(EnsamblesActions.updateEnsambleSuccess, (state, { ensamble }) => ({
    ...state,
    ensambles: state.ensambles.map(e => e.id === ensamble.id ? ensamble : e)
  })),
  on(EnsamblesActions.deleteEnsambleSuccess, (state, { id }) => ({
    ...state,
    ensambles: state.ensambles.filter(e => e.id !== id)
  }))
);