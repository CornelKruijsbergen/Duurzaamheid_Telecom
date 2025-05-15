import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwBestandComponent } from './nieuw-bestand.component';

describe('NieuwBestandComponent', () => {
  let component: NieuwBestandComponent;
  let fixture: ComponentFixture<NieuwBestandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NieuwBestandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NieuwBestandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
