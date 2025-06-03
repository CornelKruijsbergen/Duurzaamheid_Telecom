import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnderdeelWijzigenComponent } from './onderdeel-wijzigen.component';

describe('OnderdeelWijzigenComponent', () => {
  let component: OnderdeelWijzigenComponent;
  let fixture: ComponentFixture<OnderdeelWijzigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnderdeelWijzigenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnderdeelWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
