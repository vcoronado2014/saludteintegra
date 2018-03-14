import { Component, OnInit, ViewContainerRef, AUTO_STYLE  } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { ServicioLoginService } from '../../services/servicio-login.service';
import { ServicioVisorService } from '../../services/servicio-visor.service';
/* Importing ToastsManager library starts*/
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
/* Importing ToastsManager library ends*/
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
//import { appSettings } from '../appSettings';
import { environment } from '../../../environments/environment'
//import { environment } from '../../environments/environment.prod'
import { UsuarioService } from '../../services/usuario.service';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from '../../../../node_modules/ngx-modialog/plugins/bootstrap';
import { Ng2Rut, RutValidator } from 'ng2-rut'; 

declare var jQuery:any;

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
  cambioContrasena1;
  cambioContrasena2;
  verMantenedorUsuario:boolean = false;
  verVisor:boolean = false;
  //agregado por victor
  rutBuscar: string;
  urlVisor: SafeResourceUrl;

  loading = false;

  constructor(
    private router: Router,
    public acceso: ServicioLoginService,
    public visor: ServicioVisorService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    public sanitizer: DomSanitizer,
    private usu:UsuarioService,
    private modal: Modal,
    private rutValidator: RutValidator
  ) {
      this.urlVisor = sanitizer.bypassSecurityTrustResourceUrl('#');
      this.toastr.setRootViewContainerRef(_vcr);
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
  limpiarRun(){
    this.rutBuscar = "";
  }
  buscarRun(){
    //que no este vacio o nulo
    if (this.rutBuscar == '' || this.rutBuscar == null){
      this.showToast('error', 'Debe ingresar un Run', 'Visor');
      return;
    }
    //que sea mayor a 2 y menor 10 caracteres
    if (this.rutBuscar.length < 2 || this.rutBuscar.length > 9){
      this.showToast('error', 'Largo del Run incorrecto', 'Visor');
      return;
    }

    this.verMantenedorUsuario = false;
    this.verVisor = false;
    //alert(this.rutBuscar);
    this.visor.postUrl(this.rutBuscar).subscribe(
      data => {
        if (data){
          var lista = data.json();
          if (lista.Mensaje){

          //este arreglo habria que recorrerlo con un ngfor
          if (lista.Datos){
            //this.listaContratantes = lista.Datos;
            //solo para efectos de prueba
            //https://previsor.saludenred.cl/#/MTI1MzUzMDYx/MQ==/MTQ3MTQ2NA==/0A5DE165204DD5F4948932BA5B830584
            //vamos a agregar al usuario de Salud Te Integrapara enviarlo a Visor
            var usu = sessionStorage.getItem("Usuario");
            var nuevaUrl =environment.URL_VISOR_SOBRESCRIBIR +   lista.Datos.UrlHash + '/' + usu;
            
            this.urlVisor = this.sanitizer.bypassSecurityTrustResourceUrl(nuevaUrl);
            this.verVisor = true;
            //cerrar modal limpiar
            this.limpiarRun();
            jQuery('#exampleModal').modal('hide');

            //console.log(this.listaContratantes);
          }
          else{
            //levantar un modal que hubo un error
            this.showToast('error', 'No hay Datos del usuario', 'Visor');
            this.limpiarRun();
          }
        }
        else{
          this.showToast('error', 'Error al recuperar url desde Visor', 'Visor');
          this.limpiarRun();
        }

        }
      },
      err =>{ 
        console.error(err);
        var respuesta = err.json();
        if (respuesta){
          if (respuesta.Mensaje){
            this.showToast('error', respuesta.Mensaje.Texto, 'Visor');
          }
          else
          {
            this.showToast('error', 'Error al recuperar url desde Visor', 'Visor');
          }
          this.limpiarRun();
        }
        else {
          this.showToast('error', 'Error al recuperar url desde Visor', 'Visor');
          this.limpiarRun();
        }

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

  //hace toggle del segmento para ingresar la contraseña
  mostrarContrasena(){
    jQuery("#col_cambiarContrasena").addClass("animated fadeIn fast");
    setTimeout(function () { 
      jQuery("#col_cambiarContrasena").removeClass("animated fadeIn fast");
  }, 2000);
  }

  cambiarContrasena(){
    
    var password;
    if (this.cambioContrasena1 == null || this.cambioContrasena1 == ''){
      this.showToast('error', 'Contraseña es requerida', 'Error');
      return;
    }
    if (this.cambioContrasena2 == null || this.cambioContrasena2 == ''){
      this.showToast('error', 'Repetir contraseña es requerida', 'Error');
      return;
    }
    if (this.cambioContrasena1 != this.cambioContrasena2){
      this.showToast('error', 'Las contraseñas deben coincidir', 'Error');
      return;
    }
    if(this.cambioContrasena1 == this.cambioContrasena2){
      password = this.cambioContrasena1; 
    }
    this.loading = true;
    this.usu.getCambiarClave(this.usuario.Persona.CorreoElectronico, this.usuarioUser, password).subscribe(
      data => {
        if(data){
          var retorno = data.json(); 
          if (retorno.Mensaje.Codigo == '0'){
            //this.showToast('success', 'La contraseña se ha cambiado con éxito', 'Cambio exitoso');
            this.logout();
            this.loading = false;
          }
          else {
            this.showToast('error', retorno.Mensaje.Texto, 'Error');
            this.loading = false;
          }
          
        }else{
          this.showToast('error', 'Ha ocurrido un error, inténtalo nuevamente', 'Error');
          this.loading = false;
        }
      },
      err => console.error(err),
      () => console.log('cambio de contraseña')
    )
  }
  
}
