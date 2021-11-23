import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDayComponent } from './details-day.component';

describe('DetailsDayComponent', () => {
  let component: DetailsDayComponent;
  let fixture: ComponentFixture<DetailsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
