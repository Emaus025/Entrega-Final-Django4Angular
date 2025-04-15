import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiturasComponent } from './partituras.component';

describe('PartiturasComponent', () => {
  let component: PartiturasComponent;
  let fixture: ComponentFixture<PartiturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
