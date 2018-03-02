import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  fecha_actual:any;
  usuario: any;
  nombreCompleto: string;
  usuarioUser:string;
  nombreEntidadContratante:string;
  verMantenedorUsuario:boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    moment.locale('es');
    this.fecha_actual = moment().format('L');

    if (sessionStorage.getItem("Usuario") != null){
      this.usuario = JSON.parse(sessionStorage.getItem("Usuario"));
      this.usuarioUser = this.usuario.AutentificacionUsuario.NombreUsuario;
      this.nombreCompleto = this.usuario.Persona.Nombres + ' ' + this.usuario.Persona.ApellidoPaterno + ' ' + this.usuario.Persona.ApellidoMaterno;
      this.nombreEntidadContratante = this.usuario.EntidadContratante.RazonSocial;
      console.log(this.usuario);
    }
    else{
      console.log('usuario nulo');
      this.router.navigate(['/login'])
      .then(data => console.log(data),
        error => {
          console.log(error);
          
        }
      )
    }
  }
  buscarRun(){
    this.verMantenedorUsuario = false;
  }

  abrirMantenedorUsuario(){
    this.verMantenedorUsuario = true;
  }
  cerrarSesion(){
   
  }

  
}
