import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { appSettings } from '../appSettings';

import 'rxjs/add/operator/map';

@Injectable()
export class ContratanteService {

  constructor(
    private http: Http
  ) { }

  postContratantes(ecolId, rolId){
    let url = appSettings.API_ENDPOINT + 'EntidadContratante';
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
