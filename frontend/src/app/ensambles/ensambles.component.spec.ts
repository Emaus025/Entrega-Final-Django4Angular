import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnsamblesComponent } from './ensambles.component';
import { StoreModule } from '@ngrx/store';
import { ensamblesReducer } from './store/ensambles.reducer';
import { ReactiveFormsModule } from '@angular/forms';

describe('EnsamblesComponent', () => {
  let component: EnsamblesComponent;
  let fixture: ComponentFixture<EnsamblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EnsamblesComponent,
        StoreModule.forRoot({ ensambles: ensamblesReducer }),
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnsamblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
