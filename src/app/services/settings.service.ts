import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _linkTheme = document.querySelector('#theme')!;

  constructor() {
    const theme = localStorage.getItem('theme') || './assets/css/colors/default.css';
    this._linkTheme.setAttribute('href', theme);
  }

  public changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this._linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');

      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this._linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
