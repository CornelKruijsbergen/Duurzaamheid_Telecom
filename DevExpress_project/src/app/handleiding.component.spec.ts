import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleidingComponent } from './handleiding.component';

describe('HandleidingComponent', () => {
  let component: HandleidingComponent;
  let fixture: ComponentFixture<HandleidingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleidingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
