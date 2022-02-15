import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  public logout() {
    this.usuarioService.logout();
  }

  public buscar(termino: string): void {
    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
