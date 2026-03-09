import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesChart } from './responses-chart';

describe('ResponsesChart', () => {
  let component: ResponsesChart;
  let fixture: ComponentFixture<ResponsesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsesChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
