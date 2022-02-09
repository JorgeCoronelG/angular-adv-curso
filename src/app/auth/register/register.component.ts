import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from 'sweetalert2'
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['Test 100', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    confirmPassword: ['123456', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public crearUsuario(): void {
    this.formSubmited = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(res => {
        this.router.navigateByUrl('/');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error')
      });
  }

  public campoNoValido(campo: string): boolean {
    return (this.registerForm.get(campo)?.invalid! && this.formSubmited);
  }

  public aceptaTerminos(): boolean {
    return (!this.registerForm.get('terminos')?.value && this.formSubmited);
  }

  public contrasenasNoValidas(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    return (password !== confirmPassword && this.formSubmited);
  }

  public passwordsIguales(passwordName: string, confirmPasswordName: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordName);
      const confirmPassword = formGroup.get(confirmPasswordName);

      if (password?.value === confirmPassword?.value) {
        confirmPassword?.setErrors(null);
      } else {
        confirmPassword?.setErrors({ noEsIgual: true });
      }
    };
  }
}
