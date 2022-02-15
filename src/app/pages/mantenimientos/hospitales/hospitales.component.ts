import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";
import { Hospital } from "../../../models/hospital.model";
import { BusquedasService } from "../../../services/busquedas.service";
import { HospitalService } from "../../../services/hospital.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.imagenSubida
      .pipe(
        delay(1500)
      )
      .subscribe(() => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  private cargarHospitales(): void {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;

        this.hospitales = hospitales;
      });
  }

  public guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(() => {
        Swal.fire('Actualizado', 'El hospital fue actalizado', 'success');
      });
  }

  public eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id)
      .subscribe(() => {
        Swal.fire('Eliminado', 'El hospital fue eliminado', 'success');
        this.cargarHospitales();
      });
  }

  public async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      showCancelButton: true,
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del hospital'
    })
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe(() => {
          Swal.fire('Éxito', 'El hospital fue agregado', 'success');
          this.cargarHospitales();
        });
    }
  }

  public abrirModal(hospital: Hospital): void {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  public buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales();
      return;
    }

    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resultados => {
        this.hospitales = resultados as Hospital[];
      });
  }
}
