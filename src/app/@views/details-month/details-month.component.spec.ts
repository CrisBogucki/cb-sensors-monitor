import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMonthComponent } from './details-month.component';

describe('DetailsMonthComponent', () => {
  let component: DetailsMonthComponent;
  let fixture: ComponentFixture<DetailsMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
