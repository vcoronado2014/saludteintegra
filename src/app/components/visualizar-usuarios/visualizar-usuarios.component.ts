import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-usuarios',
  templateUrl: './visualizar-usuarios.component.html',
  styleUrls: ['./visualizar-usuarios.component.css']
})
export class VisualizarUsuariosComponent implements OnInit {
  nuevoUsuario:string;
  nuevoUsuarioRun:string;
  nuevoUsuarioNombre:string;
  nuevoUsuarioApellidos:string;
  nuevoUsuarioCorreo:any;
  nuevoUsuarioTelefono1:number;
  nuevoUsuarioTelefono2:number;
  nuevoUsuarioEntidad:string;
  nuevoUsuarioRol:string;
  nuevoUsuarioContrasena1:string;
  nuevoUsuarioContrasena2:string;

  constructor() { }

  ngOnInit() {
  }
  guargarUsuario(){
    console.log(this.nuevoUsuario + this.nuevoUsuarioRun + this.nuevoUsuarioNombre + this.nuevoUsuarioApellidos +
                this.nuevoUsuarioCorreo + this.nuevoUsuarioTelefono1 + this.nuevoUsuarioTelefono2 + this.nuevoUsuarioEntidad +
                this.nuevoUsuarioRol + this.nuevoUsuarioContrasena1 + this.nuevoUsuarioContrasena2);
  }
}
