import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ScenarioStats } from '../../types';



/**
 * The responses chart component displays a bar-graph of scenario responses.
 *
 * A bar is shown for each option, with a histogram of the count of responses to that component.
 */
@Component({
  selector: 'app-responses-chart',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './responses-chart.html',
  styleUrl: './responses-chart.scss'
})
export class ResponsesChartComponent {

  /**
   * The data for the chart in the format of a ScenartioStats object.
   */
  @Input()
  public scenarioStats: ScenarioStats | undefined;

  /**
   * chart.js configuration
   */
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        ticks: {
          stepSize: 1,
        }
      },
      y: {
      },
    },
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  /**
   * barChartData object used by chart.js to draw a chart (as HTML attribute).
   *
   * Set by scenarioStats property. Intended for internal component usage.
   * @readonly @internal
   */
  public get _barChartData(): ChartData<'bar'> {
    if (!this.scenarioStats) {
      return {
        labels: [],
        datasets: []
      };
    } else {
      return {
        labels: Object.keys(this.scenarioStats.optionCounts),
        datasets: [
          { data: Object.values(this.scenarioStats.optionCounts), label: 'Responses' },
        ],
      };
    }
  }

}
