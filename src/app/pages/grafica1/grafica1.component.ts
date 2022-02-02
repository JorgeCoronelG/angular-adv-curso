import { Component } from '@angular/core';
import { ChartData } from "chart.js";

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  public grafica1Labels: string[] = [ 'Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3' ];
  public grafica1Data: ChartData<'doughnut'> = {
    labels: this.grafica1Labels,
    datasets: [
      {
        data: [ 350, 450, 100 ],
        backgroundColor: ['#3F51B5','#2196F3','#00BCD4'],
        hoverBackgroundColor: ['#3949AB','#2196F3','#03A9F4'],
      }
    ]
  };
}
