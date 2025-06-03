import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnderdeelVerwijderenComponent } from './onderdeel-verwijderen.component';

describe('OnderdeelVerwijderenComponent', () => {
  let component: OnderdeelVerwijderenComponent;
  let fixture: ComponentFixture<OnderdeelVerwijderenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnderdeelVerwijderenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnderdeelVerwijderenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
