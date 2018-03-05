import { Component, ViewContainerRef } from '@angular/core';
import { BuscadorComponent } from '../buscador/buscador.component'
import { ServicioLoginService } from '../../services/servicio-login.service';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from '../../../../node_modules/ngx-modialog/plugins/bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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
               private modal: Modal,
               private toastr: ToastsManager,
               private _vcr: ViewContainerRef,
               private usu: UsuarioService ){

  this.toastr.setRootViewContainerRef(_vcr); 
}
  
  
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
      //realizamos la llamada a la api
      this.loading = true;
      this.usu.getUserName(this.loginRecuperar).subscribe(
          data => {
            if (data){
              var usuarioO = data.json();
              if (usuarioO.Datos) {
                //correo electronico a mostrar, hay que aplicar encriptación
                if (usuarioO.Mensaje.Codigo == "0"){
                  this.emailUser = usuarioO.Datos.Persona.CorreoElectronico;
                  this.iconAccion = "fas fa-check"
                }
                else {
                  //el codigo es distinto de cero, hay que mostrar error
                }
                
                //this.showToast('success', 'Usuarios recuperados con éxito', 'Usuarios');
                this.loading = false;
              }
              else{            
                 //hay que mostrar un error, en este caso no hay datos
                this.showToast('error','','Usuario no encontrado');
                this.loading = false;
                this.iconAccion = "fas fa-times"
                this.msjReset= "Usuario incorrecto, inténtalo nuevamente. Si no recuerdas tu nombre de usuario por favor contacta al Administrador."
              }
  
            }
          },
          err => console.error(err),
          () => console.log('get info usuario')
        );
    }
  }
  showToast(tipo, mensaje, titulo){
    if (tipo == 'success'){
      this.toastr.success(mensaje, titulo);
    }
    if (tipo == 'error'){
      this.toastr.error(mensaje, titulo);
    }
    if (tipo == 'info'){
      this.toastr.info(mensaje, titulo);
    }
    if (tipo == 'warning'){
      this.toastr.warning(mensaje, titulo);
    }

  }

  recuperarPass(){
    //hacer el envio a la api

  }




}
