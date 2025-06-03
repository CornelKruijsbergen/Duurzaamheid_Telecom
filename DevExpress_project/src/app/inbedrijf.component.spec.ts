import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InbedrijfComponent } from './inbedrijf.component';

describe('InbedrijfComponent', () => {
  let component: InbedrijfComponent;
  let fixture: ComponentFixture<InbedrijfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InbedrijfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InbedrijfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
