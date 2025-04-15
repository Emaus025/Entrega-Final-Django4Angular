import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Load Users
export const loadUsers = createAction('[Crud1] Load Users');
export const loadUsersSuccess = createAction('[Crud1] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Crud1] Load Users Failure', props<{ error: any }>());

// Create User
export const createUser = createAction('[Crud1] Create User', props<{ user: User }>());
export const createUserSuccess = createAction('[Crud1] Create User Success', props<{ user: User }>());
export const createUserFailure = createAction('[Crud1] Create User Failure', props<{ error: any }>());

// Update User
export const updateUser = createAction('[Crud1] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[Crud1] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Crud1] Update User Failure', props<{ error: any }>());

// Delete User
export const deleteUser = createAction('[Crud1] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Crud1] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[Crud1] Delete User Failure', props<{ error: any }>());