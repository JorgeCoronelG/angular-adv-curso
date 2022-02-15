import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Hospital } from "../models/hospital.model";
import { Medico } from "../models/medico.model";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  public baseUrl = environment.base_url;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor(private http: HttpClient) {}

  public buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${this.baseUrl}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((res: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(res.resultados);
            case 'hospitales':
              return res.resultados as Hospital[];
            case 'medicos':
              return res.resultados as Medico[];
            default:
              return [];
          }
        })
      );
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados
      .map(user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.uid, user.role));
  }
}
