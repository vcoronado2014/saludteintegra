import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {appSettings } from '../appSettings';

import 'rxjs/add/operator/map';

@Injectable()
export class ServicioLoginService{
  constructor(
    private http: Http
  ){
    //inicializamos los valores
  }

  get(usuario, password){
    let url = appSettings.API_ENDPOINT + 'Login';
    let dataGet = { usuario: usuario, password: password };

    let data = this.http.post(url, dataGet, {
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return data;
  }

}
