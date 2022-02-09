import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { LoginForm } from "../interfaces/login-form.interface";
import { RegisterForm } from "../interfaces/register-form.interface";

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public baseUrl = environment.base_url;
  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }

  public validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
      .pipe(
        tap(({token}: any) => {
          localStorage.setItem('token', token);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  public crearUsuario(formData: RegisterForm) {
    return this.http.post(`${this.baseUrl}/usuarios`, formData)
      .pipe(
        tap(({token}: any) => {
          localStorage.setItem('token', token);
        })
      );
  }

  public login(formData: LoginForm) {
    return this.http.post(`${this.baseUrl}/login`, formData)
      .pipe(
        tap(({token}: any) => {
          localStorage.setItem('token', token);
        })
      );
  }

  public loginGoogle(token: string) {
    return this.http.post(`${this.baseUrl}/login/google`, { token })
      .pipe(
        tap(({token}: any) => {
          localStorage.setItem('token', token);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('token');

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
}
