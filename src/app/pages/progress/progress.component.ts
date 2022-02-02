import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  public progreso1: number = 25;
  public progreso2: number = 35;

  public getPorcentaje(value: number): string {
    return `${value}%`;
  }
}
