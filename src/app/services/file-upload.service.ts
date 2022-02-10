import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl: string = environment.base_url;

  constructor() {}

  public async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
    try {
      const url = `${this.baseUrl}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json();
      if (data.ok) {
        return data.nombreArchivo;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
