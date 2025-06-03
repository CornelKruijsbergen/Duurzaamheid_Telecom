import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvsystemenComponent } from './pvsystemen.component';

describe('PvsystemenComponent', () => {
  let component: PvsystemenComponent;
  let fixture: ComponentFixture<PvsystemenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PvsystemenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvsystemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
