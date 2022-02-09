import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UsuarioService } from "../../services/usuario.service";

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmited: boolean = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) {}

  ngOnInit(): void {
    this.renderButton();
  }

  public login(): void {
    // this.router.navigateByUrl('/');
    this.usuarioService.login(this.loginForm.value)
      .subscribe(() => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  public attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const idToken = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(idToken)
          .subscribe(() => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
          });
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

}
