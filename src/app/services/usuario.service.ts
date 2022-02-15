import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { CargarUsuarios } from "../interfaces/cargar-usuarios.interface";
import { LoginForm } from "../interfaces/login-form.interface";
import { RegisterForm } from "../interfaces/register-form.interface";
import { Usuario } from "../models/usuario.model";

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario!: Usuario;
  public baseUrl = environment.base_url;
  public auth2: any;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role!;
  }

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }

  public validarToken(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/login/renew`, this.headers)
      .pipe(
        map(({token, usuario, menu}: any) => {
          const { email, google, nombre, role, uid, img = '' } = usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, uid, role);

          this.guardarLocalStorage(token, menu);

          return true;
        }),
        catchError(() => of(false))
      );
  }

  public crearUsuario(formData: RegisterForm) {
    return this.http.post(`${this.baseUrl}/usuarios`, formData)
      .pipe(
        tap(({token, menu}: any) => {
          this.guardarLocalStorage(token, menu);
        })
      );
  }

  public actualizarPerfil(data: { email: string, nombre: string, role: string}) {
    data = {
      ...data,
      role: this.usuario.role!
    };
    return this.http.put(`${this.baseUrl}/usuarios/${this.uid}`, data, this.headers);
  }

  public login(formData: LoginForm) {
    return this.http.post(`${this.baseUrl}/login`, formData)
      .pipe(
        tap(({token, menu}: any) => {
          this.guardarLocalStorage(token, menu);
        })
      );
  }

  public loginGoogle(token: string) {
    return this.http.post(`${this.baseUrl}/login/google`, { token })
      .pipe(
        tap(({token, menu}: any) => {
          this.guardarLocalStorage(token, menu);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  public googleInit(): Promise<any> {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '460389648454-9ni5qsl6n3dc1fjr0ql412dccvj1q79u.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });

        resolve(0);
      });
    })
  }

  public cargarUsuarios(desde: number = 0) {
    const url = `${this.baseUrl}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(
        map(res => {
          const usuarios = res.usuarios
            .map(user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.uid, user.role));

          return {
            total: res.total,
            usuarios
          }
        })
      );
  }

  public eliminarUsuario(usuario: Usuario) {
    const url = `${this.baseUrl}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  public guardarUsuario(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

  private guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }
}
