import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as Crud1Actions from './crud1.actions';
import { Crud1Service } from '../services/crud1.service';

@Injectable()
export class Crud1Effects {
  loadUsers$ = createEffect((): Observable<Action> => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(Crud1Actions.loadUsers)).subscribe(() => {
        this.crud1Service.getUsers().subscribe({
          next: (users) => {
            observer.next(Crud1Actions.loadUsersSuccess({ users }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error loading users:', error);
            observer.next(Crud1Actions.loadUsersFailure({ error: error.message }));
            observer.complete();
          }
        });
      });
    });
  });

  createUser$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(Crud1Actions.createUser)).subscribe((action) => {
        console.log('Effect: Creating user:', action.user);
        this.crud1Service.createUser(action.user).subscribe({
          next: (user) => {
            console.log('Effect: User created successfully:', user);
            observer.next(Crud1Actions.createUserSuccess({ user }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error creating user:', error);
            observer.next(Crud1Actions.createUserFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  updateUser$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(Crud1Actions.updateUser)).subscribe((action) => {
        console.log('Effect: Updating user:', action.user);
        this.crud1Service.updateUser(action.user).subscribe({
          next: (user) => {
            console.log('Effect: User updated successfully:', user);
            observer.next(Crud1Actions.updateUserSuccess({ user }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error updating user:', error);
            observer.next(Crud1Actions.updateUserFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  deleteUser$ = createEffect(() => {
    return new Observable<Action>((observer) => {
      this.actions$.pipe(ofType(Crud1Actions.deleteUser)).subscribe((action) => {
        console.log('Effect: Deleting user with ID:', action.id);
        this.crud1Service.deleteUser(action.id).subscribe({
          next: () => {
            console.log('Effect: User deleted successfully');
            observer.next(Crud1Actions.deleteUserSuccess({ id: action.id }));
            observer.complete();
          },
          error: (error) => {
            console.error('Effect: Error deleting user:', error);
            observer.next(Crud1Actions.deleteUserFailure({ error }));
            observer.complete();
          }
        });
      });
    });
  });

  constructor(
    private actions$: Actions,
    private crud1Service: Crud1Service
  ) {
    console.log('Actions:', this.actions$);
  }
}