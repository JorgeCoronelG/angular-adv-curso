import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Usuario } from "../../models/usuario.model";
import { FileUploadService } from "../../services/file-upload.service";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubida!: File | null;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  public actualizarPerfil(): void {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe((res: any) => {
        const { nombre, email } = res.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      });
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
    this.fileUploadService
      .actualizarFoto(this.imagenSubida!, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen guardada', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
