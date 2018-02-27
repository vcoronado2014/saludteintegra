import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-usuarios',
  templateUrl: './visualizar-usuarios.component.html',
  styleUrls: ['./visualizar-usuarios.component.css']
})
export class VisualizarUsuariosComponent implements OnInit {
  nuevoUsuario:string;

  constructor() { }

  ngOnInit() {
  }
  guargarUsuario(){
    console.log(this.nuevoUsuario);
  }
}
