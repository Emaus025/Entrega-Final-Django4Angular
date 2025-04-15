import { createReducer, on } from '@ngrx/store';
import { Instrumento } from '../models/instrumento.model';
import * as InstrumentosActions from './instrumentos.actions';

export interface InstrumentosState {
  instrumentos: Instrumento[];
  loading: boolean;
  error: any;
}

export const initialState: InstrumentosState = {
  instrumentos: [],
  loading: false,
  error: null
};

export const instrumentosReducer = createReducer(
  initialState,
  on(InstrumentosActions.loadInstrumentos, state => ({ ...state, loading: true })),
  on(InstrumentosActions.loadInstrumentosSuccess, (state, { instrumentos }) => ({
    ...state,
    instrumentos,
    loading: false
  })),
  on(InstrumentosActions.loadInstrumentosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(InstrumentosActions.createInstrumentoSuccess, (state, { instrumento }) => ({
    ...state,
    instrumentos: [...state.instrumentos, instrumento]
  })),
  on(InstrumentosActions.updateInstrumentoSuccess, (state, { instrumento }) => ({
    ...state,
    instrumentos: state.instrumentos.map(i => i.id === instrumento.id ? instrumento : i)
  })),
  on(InstrumentosActions.deleteInstrumentoSuccess, (state, { id }) => ({
    ...state,
    instrumentos: state.instrumentos.filter(i => i.id !== id)
  }))
);