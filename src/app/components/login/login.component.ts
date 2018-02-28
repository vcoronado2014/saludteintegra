import { Component } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component'
import { ServicioLoginService } from '../../services/servicio-login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginUsuario:string;
  loginPassword:string;
  isLogged; 
  errorLog:string;
  usuario: any;

  constructor( private auth:ServicioLoginService,
               private router: Router ) { }
  
  
  Inicio(){
    //debugger;
    if (!this.loginUsuario ){
      return this.errorLog = "Nombre de usuario requerido";
    }
    if(!this.loginPassword){
      return this.errorLog = "Contraseña requerida";
    }
    this.auth.login(this.loginUsuario,this.loginPassword).subscribe(
      rs => { 
        this.isLogged = rs;
      },
      er => {
        console.log('incorrecto' + er);
        this.errorLog = this.auth.mensajeError;
      },
      () => {
        if (this.isLogged){
          //correcto
          console.log('correcto');
          this.router.navigate(['/visor'])
          .then(data => console.log(data),
            error => {
              console.log(error);
              
            }
          )
        }
        else {
          //incorrecto
          console.log('incorrecto');
          this.errorLog = this.auth.mensajeError;
        }
      }
    );
  
  }
}
