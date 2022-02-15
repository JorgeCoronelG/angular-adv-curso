import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  private _baseUrl: string = environment.base_url;

  transform(img: string | undefined, tipo: 'usuarios' | 'medicos' | 'hospitales'): unknown {
    if (img?.includes('https')){
      return img;
    }
    return (img) ? `${this._baseUrl}/upload/${tipo}/${img}` : `${this._baseUrl}/upload/${tipo}/no-image`;
  }

}
