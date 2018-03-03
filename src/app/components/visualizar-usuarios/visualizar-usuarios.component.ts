import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { ContratanteService } from '../../services/contratante.service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from '../../../../node_modules/ngx-modialog/plugins/bootstrap';
import {$NBSP} from "@angular/compiler/src/chars";
/* Importing ToastsManager library starts*/
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
/* Importing ToastsManager library ends*/


bootstrap4Mode();
@Component({
  selector: 'app-visualizar-usuarios',
  templateUrl: './visualizar-usuarios.component.html',
  styleUrls: ['./visualizar-usuarios.component.css']
})
export class VisualizarUsuariosComponent implements OnInit {


  //listado de datos
  listaUsuarios;
  listaRoles;
  listaContratantes;
  estadoDelUsuario;
  loading = false;
  //usuario logueado
  usuario: any;

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

  constructor(
    private usu:UsuarioService,
    private rol:RolService,
    private con:ContratanteService,
    private router: Router,
    public modal:Modal,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef
  ) {
      this.listaUsuarios = [];
      this.listaRoles = [];
      this.listaContratantes = [];
      this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    if (sessionStorage.getItem("Usuario") != null){
      //inicio del loading
      this.usuario = JSON.parse(sessionStorage.getItem("Usuario"));
      this.obtenerListaUsuarios(this.usuario.AutentificacionUsuario.EcolId.toString(), this.usuario.AutentificacionUsuario.RolId.toString());
      this.obtenerListaRoles(this.usuario.AutentificacionUsuario.RolId.toString());
      this.obtenerListaContratantes(this.usuario.AutentificacionUsuario.EcolId.toString(), this.usuario.AutentificacionUsuario.RolId.toString());
      //fin del loading
    }
  }

  guargarUsuario(){
    console.log(this.nuevoUsuario + this.nuevoUsuarioRun + this.nuevoUsuarioNombre + this.nuevoUsuarioApellidos +
                this.nuevoUsuarioCorreo + this.nuevoUsuarioTelefono1 + this.nuevoUsuarioTelefono2 + this.nuevoUsuarioEntidad +
                this.nuevoUsuarioRol + this.nuevoUsuarioContrasena1 + this.nuevoUsuarioContrasena2);
  }

  obtenerListaUsuarios(ecolId, rolId){
    //indicador valor
    this.usu.postUsers(ecolId, rolId).subscribe(
        data => {
          if (data){
            var lista = data.json();

            //este arreglo habria que recorrerlo con un ngfor
            if (lista.Datos) {
              this.listaUsuarios = lista.Datos;
              //this.showToast('success', 'Usuarios recuperados con éxito', 'Usuarios');
            }
            else{
              //levantar un modal que hubo un error
              this.showToast('error', 'Error al recuperar usuarios', 'Usuarios');
            }

          }
        },
        err => console.error(err),
        () => console.log('get info usuarios')
      );

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
  obtenerListaRoles(rolId){
    //indicador valor
    this.rol.postRoles(rolId).subscribe(
        data => {
          if (data){
            var lista = data.json();

            //este arreglo habria que recorrerlo con un ngfor
            if (lista.Datos){
              this.listaRoles = lista.Datos;


              console.log(this.listaRoles);
            }
            else{
              //levantar un modal que hubo un error
              this.showToast('error', 'Error al recuperar Roles', 'Roles');
            }

          }
        },
        err => console.error(err),
        () => console.log('get info roles')
      );

  }
  obtenerListaContratantes(ecolId, rolId){
    //indicador valor
    this.con.postContratantes(ecolId, rolId).subscribe(
        data => {
          if (data){
            var lista = data.json();

            //este arreglo habria que recorrerlo con un ngfor
            if (lista.Datos){
              this.listaContratantes = lista.Datos;


              console.log(this.listaContratantes);
            }
            else{
              //levantar un modal que hubo un error
              this.showToast('error', 'Error al recuperar contratantes', 'Contratantes');

            }

          }
        },
        err => console.error(err),
        () => console.log('get info contratantes')
      );

  }
  deleteUser(usuario){
    //eliminar usuarios
    console.log(usuario);
    let nombre = usuario.Persona.Nombres + ' ' + usuario.Persona.ApellidoPaterno;
    const dialogRef = this.modal.confirm()
      .size('lg')
      .showClose(false)
      .title('Activar Usuario')
      .keyboard(27)
      .body(`
                    <h4 class="text-center">¿Estás seguro de eliminar a ` + nombre + `?</h4>
                    <p class="text-center">Al Eliminar al Usuario no aparecerá en la lista y el usuario no podrá volver a acceder al Sistema.</p>`)
      .open();

    dialogRef.result
      .then( result => {
          //alert(`The result is: ${result}`);
          if (result){
            //gatilla la accion de desactivar
            this.loading = true;
            this.usu.deleteUser(usuario.AutentificacionUsuario.Id.toString()).subscribe(
              data => {
                this.loading = false;
                if (data){
                  var usuarioCambiado = data.json();

                  //este arreglo habria que recorrerlo con un ngfor
                  if (usuarioCambiado.Datos){
                    console.log(usuarioCambiado.Datos);
                    console.log(usuarioCambiado.Mensaje);
                    this.showToast('success', 'Usuarios eliminado con éxito', 'Activado');
                    //actualizamos la lista
                    this.obtenerListaUsuarios(this.usuario.AutentificacionUsuario.EcolId.toString(), this.usuario.AutentificacionUsuario.RolId.toString());
                  }
                  else{
                    //levantar un modal que hubo un error
                    console.log('error');
                    this.showToast('error', 'Error al eliminar usuario', 'Usuarios');
                  }

                }
              },
              err => {
                this.showToast('error', err, 'Usuarios');
                console.error(err);
                },
              () => console.log('get info contratantes')
            );
          }
        }
      );
  }
  desactivarUsuario(usuario){
    console.log(usuario);
    let nombre = usuario.Persona.Nombres + ' ' + usuario.Persona.ApellidoPaterno;
    const dialogRef = this.modal.confirm()
                    .size('lg')
                    .showClose(false)
                    .title('Desactivar Usuario')
                    .keyboard(27)
                    .body(`
                        <h4 class="text-center">¿Estás seguro de desactivar a ` + nombre + `?</h4>
                        <p class="text-center">Al desactivarlo el usuario no podrá ingresar al Sistema.</p>`)
                    .open();

    dialogRef.result
    .then( result => {
        //alert(`The result is: ${result}`);
        if (result){
          //gatilla la accion de desactivar
          this.usu.desactivarUser(usuario.AutentificacionUsuario.Id.toString()).subscribe(
            data => {
              if (data){
                var usuarioCambiado = data.json();

                //este arreglo habria que recorrerlo con un ngfor
                if (usuarioCambiado.Datos){
                  console.log(usuarioCambiado.Datos);
                  console.log(usuarioCambiado.Mensaje);
                  this.showToast('success', 'Usuarios desactivado con éxito', 'Usuarios');
                  //actualizamos la lista
                  this.obtenerListaUsuarios(this.usuario.AutentificacionUsuario.EcolId.toString(), this.usuario.AutentificacionUsuario.RolId.toString());
                }
                else{
                  //levantar un modal que hubo un error
                  console.log('error');
                  this.showToast('error', 'Error al desactivar usuario', 'Usuarios');
                }

              }
            },
            err => {
              this.showToast('error', err, 'Usuarios');
              console.error(err);
            },
            () => console.log('get info contratantes')
          );
        }
      }
    );

  }
  viewUser(usuario){
    var html = '<h4 class="text-center" style="padding-bottom: 15px;">' +usuario.Persona.Nombres + ' ' + usuario.Persona.ApellidoPaterno + ' ' + usuario.Persona.ApellidoMaterno + ', Rol ' + usuario.Rol.Nombre + '</h4>' +
    '<div class="container">'+
    '<div class="row header-info"><div class="col-3 text-center">Nombre Usuario</div><div class="col-3 text-center">Run</div><div class="col-6 text-center">Correo Electrónico</div></div>' +
    '<div class="row header-row"><div class="col-3 text-center">' + usuario.AutentificacionUsuario.NombreUsuario + '</div><div class="col-3 text-center">' + usuario.Persona.Run + '</div><div class="col-6 text-center">' + usuario.Persona.CorreoElectronico + '</div></div>' +
    '<div class="row header-info"><div class="col-6 text-center">Teléfonos de Contacto</div><div class="col-6 text-center">Entidad Contratante</div></div>' +
    '<div class="row header-row"><div class="col-6 text-center">' + usuario.Persona.TelefonoContactoUno + ' - ' + usuario.Persona.TelefonoContactoDos + '</div><div class="col-6 text-center">' + usuario.EntidadContratante.RazonSocial + '</div></div>' +
    '</div>';

    const dialogRef = this.modal.alert()
        .size('lg')
        .showClose(false)
        .title('Info Usuario')
        .keyboard(27)
        .body(html)
        .open();

  }
  activarUsuario(usuario){
    console.log(usuario);
    let nombre = usuario.Persona.Nombres + ' ' + usuario.Persona.ApellidoPaterno;
    const dialogRef = this.modal.confirm()
                    .size('lg')
                    .showClose(false)
                    .title('Activar Usuario')
                    .keyboard(27)
                    .body(`
                    <h4 class="text-center">¿Estás seguro de activar a ` + nombre + `?</h4>
                    <p class="text-center">Al activarlo el Usuario podrá volver a acceder al Sistema.</p>`)
                    .open();

    dialogRef.result
    .then( result => {
        //alert(`The result is: ${result}`);
        if (result){
          //gatilla la accion de desactivar
          this.loading = true;
          this.usu.activarUser(usuario.AutentificacionUsuario.Id.toString()).subscribe(
            data => {
              this.loading = false;
              if (data){
                var usuarioCambiado = data.json();

                //este arreglo habria que recorrerlo con un ngfor
                if (usuarioCambiado.Datos){
                  console.log(usuarioCambiado.Datos);
                  console.log(usuarioCambiado.Mensaje);
                  this.showToast('success', 'Usuario activado con éxito', 'Usuarios');
                  //actualizamos la lista
                  this.obtenerListaUsuarios(this.usuario.AutentificacionUsuario.EcolId.toString(), this.usuario.AutentificacionUsuario.RolId.toString());
                }
                else{
                  //levantar un modal que hubo un error
                  this.showToast('error', 'Error al activar Usuario', 'Usuarios');
                  console.log('error');
                }

              }
            },
            err => console.error(err),
                () => console.log('get info contratantes')

          );
        }
      }
    );

  }
  verUsuario(){
    //ver usuario
  }
  editarUsuario(){
    //editar usuario
  }
}
