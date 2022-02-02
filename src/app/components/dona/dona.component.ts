import { Component, Input } from '@angular/core';
import { ChartData } from "chart.js";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input()
  public title: string = 'Sin título';

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];

  @Input('data')
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [ 150, 250, 75 ],
        backgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
      }
    ]
  };
}
