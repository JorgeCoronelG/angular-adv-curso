import { Injectable, EventEmitter } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  private _baseUrl: string = environment.base_url;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id!: string;
  public img?: string

  public imagenSubida: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  public abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-image'): void {
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${this._baseUrl}/upload/${tipo}/${img}`;
    }
    this._ocultarModal = false;
  }

  public cerrarModal(): void {
    this._ocultarModal = true;
  }
}
