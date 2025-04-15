import { createReducer, on } from '@ngrx/store';
import { Partitura } from '../models/partitura.model';
import * as PartiturasActions from './partituras.actions';

export interface PartiturasState {
  partituras: Partitura[];
  loading: boolean;
  error: any;
}

export const initialState: PartiturasState = {
  partituras: [],
  loading: false,
  error: null
};

export const partiturasReducer = createReducer(
  initialState,
  on(PartiturasActions.loadPartituras, state => ({ ...state, loading: true })),
  on(PartiturasActions.loadPartiturasSuccess, (state, { partituras }) => ({
    ...state,
    partituras,
    loading: false
  })),
  on(PartiturasActions.loadPartiturasFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(PartiturasActions.createPartituraSuccess, (state, { partitura }) => ({
    ...state,
    partituras: [...state.partituras, partitura]
  })),
  on(PartiturasActions.updatePartituraSuccess, (state, { partitura }) => ({
    ...state,
    partituras: state.partituras.map(p => p.id === partitura.id ? partitura : p)
  })),
  on(PartiturasActions.deletePartituraSuccess, (state, { id }) => ({
    ...state,
    partituras: state.partituras.filter(p => p.id !== id)
  }))
);