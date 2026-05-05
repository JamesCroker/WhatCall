import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesChartComponent } from './responses-chart';

describe('ResponsesChartComponent', () => {
  let component: ResponsesChartComponent;
  let fixture: ComponentFixture<ResponsesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsesChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResponsesChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('chart data should default to empty chart if undefined', () => {
    component.scenarioStats = undefined;
    expect(component.barChartData).toEqual({
      labels: [],
      datasets: []
    })
  });

  it('chart data should be correctly formatted', () => {
    component.scenarioStats = {
      totalResponses: 4,
      optionCounts: {
        a: 1,
        b: 2,
        c: 1
      }
    }
    expect(component.barChartData).toEqual({
      labels: ['a', 'b', 'c'],
      datasets: [
        { data: [1, 2, 1], label: 'Responses' }
      ]
    })

  });

});
