import { createReducer, on } from '@ngrx/store';
import * as Crud1Actions from './crud1.actions';
import { User } from '../models/user.model';

export interface Crud1State {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: Crud1State = {
  users: [],
  loading: false,
  error: null
};

export const crud1Reducer = createReducer(
  initialState,
  on(Crud1Actions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(Crud1Actions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(Crud1Actions.loadUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    loading: false,
    error
  }))
);