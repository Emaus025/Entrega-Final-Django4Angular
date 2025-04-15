import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { Crud1Effects } from './crud1.effects';

describe('Crud1Effects', () => {
  let actions$: Observable<any>;
  let effects: Crud1Effects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Crud1Effects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(Crud1Effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
