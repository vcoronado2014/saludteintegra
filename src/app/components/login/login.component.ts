import { Component } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component'
import { ServicioLoginService } from '../../services/servicio-login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";

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

  constructor( private auth:ServicioLoginService,
               private router: Router ) { }

  Inicio(){
    debugger;
    if (!this.loginUsuario ){
      return this.errorLog = "Nombre de usuario requerido";
    }
    if(!this.loginPassword){
      return this.errorLog = "Contraseña requerida";
    }

    this.auth.login(this.loginUsuario,this.loginPassword)
      .subscribe(
        rs => this.isLogged = rs,
        er => {
          console.log(this.auth.mensajeError);
          this.errorLog = this.auth.mensajeError;
        },
        () => {
          if(this.isLogged){
            this.router.navigate(['/visor'])
              .then(data => console.log(data),
                error => {
                  console.log(this.auth.mensajeError)
                  this.errorLog = this.auth.mensajeError;
                }
              );
          }else{
            console.log("auth denegado");
            this.errorLog = this.auth.mensajeError;
          }
        }
      )
  }


 

}
