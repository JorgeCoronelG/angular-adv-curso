import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Hospital } from "../../models/hospital.model";
import { Medico } from "../../models/medico.model";
import { Usuario } from "../../models/usuario.model";
import { BusquedasService } from "../../services/busquedas.service";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedasService: BusquedasService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => this.busquedaGlobal(termino));
  }

  private busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino)
      .subscribe(({ usuarios, hospitales, medicos }: any) => {
        this.usuarios = usuarios;
        this.hospitales = hospitales;
        this.medicos = medicos;
      });
  }
}
