import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeheerderComponent } from './beheerder.component';

describe('BeheerderComponent', () => {
  let component: BeheerderComponent;
  let fixture: ComponentFixture<BeheerderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeheerderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeheerderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
