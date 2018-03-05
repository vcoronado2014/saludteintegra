import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { appSettings } from '../appSettings';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(
    private http: Http
  ) {

   }

  postUsers(ecolId, rolId){
    let url = appSettings.API_ENDPOINT + 'Usuario';
    let dataGet = {
       EcolId: ecolId,
       RolId: rolId
      };

    let data = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return data;
  }

  crearModificarUser(
    nombreUsuario,
    ecolId,
    rolId,
    nombres,
    primerApellido,
    segundoApellido,
    correoElectronico,
    ausId,
    password,
    telefonoContactoUno,
    telefonoContactoDos,
    run
  ){
    let url = appSettings.API_ENDPOINT + 'Usuario';
    let dataGet = {
      NombreUsuario: nombreUsuario,
      EcolId: ecolId.toString(),
      RolId: rolId.toString(),
      Nombres: nombres,
      PrimerApellido: primerApellido,
      SegundoApellido: segundoApellido,
      CorreoElectronico: correoElectronico,
      AusId: ausId.toString(),
      Password: password,
      TelefonoContactoUno: telefonoContactoUno,
      TelefonoContactoDos: telefonoContactoDos,
      Run: run
    };

    let data = this.http.put(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return data;
  }

  desactivarUser(ausId){

     let url = appSettings.API_ENDPOINT + 'Usuario';

    let data = this.http.delete(url, { params: {Id: ausId.toString(), TipoOperacion: '0' }});
    return data;


  }
  activarUser(ausId){

    let url = appSettings.API_ENDPOINT + 'Usuario';

    let data = this.http.delete(url, { params: {Id: ausId.toString(), TipoOperacion: '1' }});
    return data;


  }
  deleteUser(ausId){

    let url = appSettings.API_ENDPOINT + 'Usuario';

    let data = this.http.delete(url, { params: {Id: ausId.toString(), TipoOperacion: '2' }});
    return data;


  }
  getUserId(ausId){

    let url = appSettings.API_ENDPOINT + 'Usuario?id=' + ausId;

    let data = this.http.get(url);
    return data;

  }
  //este Retorna un usuario compuesto
  
  getUserName(nombreUsuario){
    
        let url = appSettings.API_ENDPOINT + 'Usuario?nombreUsuario=' + nombreUsuario;
    
        let data = this.http.get(url);
        return data;
    
      }
//este retorna en la data un True o False      
getCambiarClave(email, nombreUsuario, password){
  
      let url = appSettings.API_ENDPOINT + 'Clave?email=' + email + '&nombreUsuario=' + nombreUsuario + '&password=' + password;
  
      let data = this.http.get(url);
      return data;
  
    }
//este retorna en la Data un True o False
    postRecuperarClave(email, nombreUsuario, password){
      let url = appSettings.API_ENDPOINT + 'Clave';
      let dataGet = {
         Email: email,
         NombreUsuario: nombreUsuario,
         Password: password
        };
  
      let data = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return data;
    }    

}
