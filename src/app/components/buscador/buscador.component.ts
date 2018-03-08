import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { ServicioLoginService } from '../../services/servicio-login.service';
import { ServicioVisorService } from '../../services/servicio-visor.service';
/* Importing ToastsManager library starts*/
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
/* Importing ToastsManager library ends*/

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
  rolUsuario:string;
  verMantenedorUsuario:boolean = false;
  verVisor:boolean = false;
  //agregado por victor
  rutBuscar: string;
  urlVisor: string;


  constructor(
    private router: Router,
    public acceso: ServicioLoginService,
    public visor: ServicioVisorService,
    private toastr: ToastsManager
  ) {
      this.urlVisor = "";
  }

  ngOnInit() {
    moment.locale('es');
    this.fecha_actual = moment().format('L');

    if (sessionStorage.getItem("Usuario") != null){
      this.usuario = JSON.parse(sessionStorage.getItem("Usuario"));
      this.usuarioUser = this.usuario.AutentificacionUsuario.NombreUsuario;
      this.nombreCompleto = this.usuario.Persona.Nombres + ' ' + this.usuario.Persona.ApellidoPaterno + ' ' + this.usuario.Persona.ApellidoMaterno;
      this.nombreEntidadContratante = this.usuario.EntidadContratante.RazonSocial;
      this.rolUsuario = this.usuario.Rol.Nombre;
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
  showToast(tipo, mensaje, titulo){
    if (tipo == 'success'){
      this.toastr.success(mensaje, titulo);
    }
    if (tipo == 'error'){
      this.toastr.error(mensaje, titulo);
    }
    if (tipo == 'info'){
      this.toastr.info(mensaje, titulo);
    }
    if (tipo == 'warning'){
      this.toastr.warning(mensaje, titulo);
    }

  }
  buscarRun(){
    this.verMantenedorUsuario = false;
    
    //alert(this.rutBuscar);
    this.visor.postUrl(this.rutBuscar).subscribe(
      data => {
        if (data){
          var lista = data.json();
          if (lista.Mensaje){

          //este arreglo habria que recorrerlo con un ngfor
          if (lista.Datos){
            //this.listaContratantes = lista.Datos;
            this.urlVisor = lista.Datos;
            this.verVisor = true;

            //console.log(this.listaContratantes);
          }
          else{
            //levantar un modal que hubo un error
            this.showToast('error', 'Error al recuperar url desde Visor', 'Visor');

          }
        }
        else{
          this.showToast('error', 'Error al recuperar url desde Visor', 'Visor');
        }

        }
      },
      err =>{ 
        console.error(err);

      },
      () => console.log('get info contratantes')
    );
  }

  abrirMantenedorUsuario(){
    this.verMantenedorUsuario = true;
    this.verVisor = false;
  }

  verConfigUsuario(){
    this.verMantenedorUsuario = false;
    this.verVisor = false;
  }

  //logout
  logout(){
    this.acceso.logout();
    console.log('cerrar sesion');
    this.router.navigate(['/login'])
    .then(data => console.log(data),
      error => {
        console.log(error);
        
      }
    )
  }

  
}
