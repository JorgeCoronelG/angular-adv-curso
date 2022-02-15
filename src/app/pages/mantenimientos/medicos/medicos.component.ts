import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";
import { Medico } from "../../../models/medico.model";
import { BusquedasService } from "../../../services/busquedas.service";
import { MedicoService } from "../../../services/medico.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.imagenSubida
      .pipe(
        delay(1500)
      )
      .subscribe(() => this.cargarMedicos());
  }

  public cargarMedicos(): void {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      });
  }

  public eliminarMedico(medico: Medico) {
    this.medicoService.eliminarMedico(medico._id)
      .subscribe(() => {
        Swal.fire('Eliminado', 'El médico fue eliminado', 'success');
        this.cargarMedicos();
      });
  }

  public buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe(resultados => {
        this.medicos = resultados as Medico[];
      });
  }

  public abrirModal(medico: Medico): void {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
}
