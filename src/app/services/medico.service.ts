import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Medico } from "../models/medico.model";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private _baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) {}

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

  public cargarMedicos() {
    const url = `${this._baseUrl}/medicos`;
    return this.http.get<Medico[]>(url, this.headers)
      .pipe(
        map((res: any) => res.medicos)
      );
  }

  public findById(id: string): Observable<Medico> {
    const url = `${this._baseUrl}/medicos/${id}`;
    return this.http.get<Medico>(url, this.headers)
      .pipe(
        map((res: any) => res.medico)
      );
  }

  public crearMedico(medico: {nombre: string, hospital: string}) {
    const url = `${this._baseUrl}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  public actualizarMedico(medico: Medico) {
    const url = `${this._baseUrl}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  public eliminarMedico(id: string) {
    const url = `${this._baseUrl}/medicos/${id}`;
    return this.http.delete(url, this.headers);
  }
}
