import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgChartsModule } from "ng2-charts";
import { DonaComponent } from './dona/dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent
  ]
})
export class ComponentsModule { }
