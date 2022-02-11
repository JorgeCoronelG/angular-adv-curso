import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "../components/components.module";
import { SharedModule } from "../shared/shared.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { PagesComponent } from "./pages.component";
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }
