import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [];

  constructor() {}

  public cargarMenu(): void {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
    if (this.menu.length === 0) {
      // Aquí se podría redireccionar al usuario al login
    }
  }
}
