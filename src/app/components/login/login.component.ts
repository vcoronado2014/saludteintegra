import { Component } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component'
import { ServicioLoginService } from '../../services/servicio-login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from '../../../../node_modules/ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginUsuario:string;
  loginPassword:string;
  loginRecuperar:string;
  isLogged; 
  errorLog:string;
  usuario: any;
  loading = false;
  resetPass = false;
  msjReset:string;
  iconAccion = "fa-search";
  emailUser:string;

  constructor( private auth:ServicioLoginService,
               private router: Router,
               private modal: Modal ) { }
  
  
  Inicio(){
    
    if (!this.loginUsuario ){
      return this.errorLog = "Nombre de usuario requerido";
    }
    if(!this.loginPassword){
        
      return this.errorLog = "Contraseña requerida";
    }

    this.loading = true;
    this.auth.login(this.loginUsuario,this.loginPassword).subscribe(
      rs => { 
        this.loading = false;
        this.isLogged = rs;
      },
      er => {
        this.loading = false;
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

  checkUser(loginRecuperar){
    this.iconAccion = "fa-spinner fa-spin"

    if(!this.loginRecuperar){
      this.iconAccion = "fas fa-times"
      this.msjReset= "Usuario incorrecto, inténtalo nuevamente. Si no recuerdas tu nombre de usuario por favor contacta al Administrador."
    }
    this.iconAccion = "fa-spinner fa-spin"
    if(this.loginRecuperar){
      this.iconAccion = "fas fa-check"
      this.emailUser = "mxxxxxxxx@gxxx.com"//email encriptado
    }

    //cuando esté ok debe cambiar a "fas fa-check"
    //cuando esté rechazado cambiar a "fas fa-times"

  }








  recuperarPass(){

    if (!this.loginRecuperar){
      return this.msjReset = "Ingresa tu nombre de usuario, si no lo recuerdas debes contactarte con el administrador.";
    }
    if(this.loginRecuperar){
      this.msjReset="Se ha enviado un email de recuperación a: mxxxxxxxxx@gxxxx.com"
    }

  }




}
