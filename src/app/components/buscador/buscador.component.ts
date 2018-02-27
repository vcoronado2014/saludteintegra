import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  fecha_actual:any;

  constructor() { }

  ngOnInit() {
    moment.locale('es');
    this.fecha_actual = moment().format('L');
  }

  cerrarSesion(){
    alert("¿Estás seguro que quieres cerrar sesión?");
  }
}
