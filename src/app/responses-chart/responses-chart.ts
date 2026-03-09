import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScenarioStats } from '../../services/responseService';

const EMPTY_CHART_DATA: ChartData<'bar'> = {
    labels: [],
    datasets: [
    ],
  }

@Component({
  selector: 'app-responses-chart',
  imports: [BaseChartDirective],
  templateUrl: './responses-chart.html',
  styleUrl: './responses-chart.scss',
})
export class ResponsesChartComponent {

  @Input()
  set scenarioStats(stats: ScenarioStats | undefined) {
    if (!stats) {
      this.barChartData = EMPTY_CHART_DATA;
      return;
    }
    this.barChartData = {
      labels: Object.keys(stats.optionCounts),
      datasets: [
        { data: Object.values(stats.optionCounts), label: 'Responses' },
      ],
    };
  }

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
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = EMPTY_CHART_DATA;

}