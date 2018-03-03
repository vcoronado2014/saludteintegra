import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { appSettings } from '../appSettings';

import 'rxjs/add/operator/map';

@Injectable()
export class ServicioLoginService{
  username:string;
  loggedIn:boolean;
  mensajeError:string;

  constructor( 
    private http: Http
  ){

    //inicializamos los valores
    this.username = "";
    this.loggedIn = false;
    this.mensajeError = "Error en llamada Http";

  }

  login(usuario, password){

    let url = appSettings.API_ENDPOINT + 'Login';
    let dataGet = { usuario: usuario, password: password };

   return this.http.post(url, dataGet, {headers: new Headers({'Content-Type': 'application/json'})})
      .map((data) => 
      data.json()
    )
      .map(data =>{
       
        //control de errores
        if(data.Mensaje.Codigo == "1"){
          this.loggedIn = false;
          this.mensajeError = "Usuario no existe";
        }
        else if (data.Mensaje.Codigo == "2"){
          this.loggedIn = false;
          this.mensajeError = "Contraseña inválida";
        }
        else if (data.Mensaje.Codigo == "0") {
          //respuesta correcta

          var user = data.Datos.AutentificacionUsuario.NombreUsuario;
          var pass = data.Datos.AutentificacionUsuario.Password;

          sessionStorage.setItem('usuario', user);
          sessionStorage.setItem('contraseña', pass);
          var userGuardar = JSON.stringify(data.Datos);
          sessionStorage.setItem("Usuario", userGuardar);

          this.loggedIn = true;
          this.mensajeError = data.Mensaje.Texto;

        }
        else {
          this.loggedIn = false;
          if (data.Mensaje != null){
              if (data.Mensaje.Codigo == "1"){
                this.mensajeError = "Usuario no existe";
              }
              if (data.Mensaje.Codigo == "2"){
                this.mensajeError = "Clave incorrecta";
              }
              if (data.Mensaje.Codigo == "5"){
                this.mensajeError = "Usuario Inactivo o eliminado";
              }
          }
          else
            this.mensajeError = "Error de comunicación con el servidor";
        }
             
        return this.loggedIn;
      });
    
  }
  logout():void{
    sessionStorage.clear();
    this.username = "";
    this.loggedIn = false;

  }
    isLoggedId(){
    return this.loggedIn;
  }

}

