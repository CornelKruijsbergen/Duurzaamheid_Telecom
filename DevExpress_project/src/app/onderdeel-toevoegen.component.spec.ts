import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnderdeelToevoegenComponent } from './onderdeel-toevoegen.component';

describe('OnderdeelToevoegenComponent', () => {
  let component: OnderdeelToevoegenComponent;
  let fixture: ComponentFixture<OnderdeelToevoegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnderdeelToevoegenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnderdeelToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
