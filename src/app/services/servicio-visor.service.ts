import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { appSettings } from '../appSettings';

import 'rxjs/add/operator/map';

@Injectable()
export class ServicioVisorService {

  constructor(
    private http: Http
  ) { }

  postUrl(run){
    let url = appSettings.API_ENDPOINT + 'Visor';
    let dataGet = {
       Run: run 
      };

      let data = this.http.post(url, dataGet, {
        headers: new Headers({'Content-Type': 'application/json'})
      });
      return data;


   }

}
