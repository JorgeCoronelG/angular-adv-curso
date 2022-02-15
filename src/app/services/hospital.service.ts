import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Hospital } from "../models/hospital.model";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  public baseUrl: string = environment.base_url;

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

  public cargarHospitales(): Observable<Hospital[]> {
    const url = `${this.baseUrl}/hospitales`;
    return this.http.get<Hospital[]>(url, this.headers)
      .pipe(
        map((res: any) => res.hospitales)
      );
  }

  public crearHospital(nombre: string) {
    const url = `${this.baseUrl}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);
  }

  public actualizarHospital(id: string, nombre: string) {
    const url = `${this.baseUrl}/hospitales/${id}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  public eliminarHospital(id: string) {
    const url = `${this.baseUrl}/hospitales/${id}`;
    return this.http.delete(url, this.headers);
  }
}
