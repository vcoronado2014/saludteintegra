import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-espacio-visor',
  templateUrl: './espacio-visor.component.html',
  styleUrls: ['./espacio-visor.component.css']
})
export class EspacioVisorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //ACA DEBERÍA VENIR EN LA URL EL ELEMENTO
    var urlLLegada = window;
    
  }

}
