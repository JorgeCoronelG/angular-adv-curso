import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  @Input()
  public progreso: number = 40;
  @Input()
  public btnClass: string = 'btn-primary';

  @Output()
  public onValueChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  public cambiarValor(value: number): void {
    if (this.progreso >= 100 && value >= 0) {
      this.progreso = 100;
    } else if (this.progreso <= 0 && value < 0) {
      this.progreso = 0;
    } else {
      this.progreso += value;
    }

    this.onValueChange.emit(this.progreso);
  }

  public onChange(value: number): void {
    if (value > 100) {
      this.progreso = 100;
    } else if (value < 0) {
      this.progreso = 0;
    } else {
      this.progreso = value;
    }

    this.onValueChange.emit(value);
  }

}
