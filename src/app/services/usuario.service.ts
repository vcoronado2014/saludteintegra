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

}
