import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { FileUploadService } from "../../services/file-upload.service";
import { ModalImagenService } from "../../services/modal-imagen.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [`
    .oculto {
      display: none;
    }
  `]
})
export class ModalImagenComponent implements OnInit {
  public imagenSubida!: File | null;
  public imgTemp: any = null;

  constructor(private modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService) {}

  get ocultarModal(): boolean {
    return this.modalImagenService.ocultarModal;
  }

  get img(): string {
    return this.modalImagenService.img!;
  }

  ngOnInit(): void {
  }

  public cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  public cambiarImagen(event: any) {
    const file = event?.target?.files[0];

    if (!event) {
      this.imgTemp = null;
      return;
    }

    this.imagenSubida = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  public subirImagen(): void {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubida!, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen guardada', 'success');
        this.modalImagenService.imagenSubida.emit(true);
        this.cerrarModal();
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
