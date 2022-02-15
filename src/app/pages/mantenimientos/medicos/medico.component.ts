import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";
import { Hospital } from "../../../models/hospital.model";
import { Medico } from "../../../models/medico.model";
import { HospitalService } from "../../../services/hospital.service";
import { MedicoService } from "../../../services/medico.service";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ['']
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado?: Medico;
  public hospitalSeleccionado?: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();
    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalId);
      });
  }

  public cargarMedico(id: string) {
    if (id === 'nuevo') return;

    this.medicoService.findById(id)
      .pipe(
        delay(500)
      )
      .subscribe(medico => {
        const { nombre, hospital } = medico;
        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({
          nombre,
          hospital: hospital?._id
        });
      }, () => {
        this.router.navigateByUrl('/dashboard/medicos');
      });
  }

  public guardarMedico(): void {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoService.actualizarMedico(data)
        .subscribe(() => {
          Swal.fire('Creado', `${nombre} actualizado correctamente.`, 'success');
        });
    } else {
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((res: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente.`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
        });
    }
  }

  public cargarHospitales(): void {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.hospitales = hospitales;
      });
  }
}
