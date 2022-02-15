import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";
import { Usuario } from "../../../models/usuario.model";
import { BusquedasService } from "../../../services/busquedas.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";
import { UsuarioService } from "../../../services/usuario.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginacion: number = 0;
  public cargando: boolean = true;

  public imgSubs!: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.imagenSubida
      .pipe(
        delay(2000)
      )
      .subscribe(() => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.paginacion)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  public cambiarPagina(valor: number) {
    this.paginacion += valor;

    if (this.paginacion < 0) {
      this.paginacion = 0;
    } else if (this.paginacion >= this.totalUsuarios) {
      this.paginacion -= valor;
    }

    this.cargarUsuarios();
  }

  public buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = [...this.usuariosTemp];
      return;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados as Usuario[];
      });
  }

  public eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.usuario.uid) {
      Swal.fire('Error', 'No puede borrarse a sí mismo.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(() => {
            Swal.fire('Usuario borrado', `${usuario.nombre} ha sido eliminado correctamente`, 'success');
            this.cargarUsuarios();
          });
      }
    });
  }

  public cambiarRol(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe();
  }

  public abrirModal(usuario: Usuario): void {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
