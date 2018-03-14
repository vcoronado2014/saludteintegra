import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
//import { appSettings } from '../appSettings';
import { environment } from '../../environments/environment'
//import { environment } from '../../environments/environment.prod'

import 'rxjs/add/operator/map';

@Injectable()
export class ContratanteService {

  constructor(
    private http: Http
  ) { }


  putImpresion(ausId, run, ecolId, fechaAtencion) {
      let url = environment.API_ENDPOINT + 'Impresion';
      let dataGet = {
          AusId: ausId.toString(),
          Run: run,
          EcolId: ecolId.toString(),
          FechaAtencion: fechaAtencion
      };

      let data = this.http.put(url, dataGet, {
          headers: new Headers({ 'Content-Type': 'application/json' })
      });
      return data;

  }
  postContratantes(ecolId, rolId){
    let url = environment.API_ENDPOINT + 'EntidadContratante';
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
