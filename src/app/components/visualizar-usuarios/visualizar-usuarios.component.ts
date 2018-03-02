import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { ContratanteService } from '../../services/contratante.service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from '../../../../node_modules/ngx-modialog/plugins/bootstrap';

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
    public modal:Modal
  ) {
      this.listaUsuarios = [];
      this.listaRoles = [];
      this.listaContratantes = [];
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
            if (lista.Datos){
              this.listaUsuarios = lista.Datos;
              

              console.log(this.listaUsuarios);
            }
            else{
              //levantar un modal que hubo un error
              
            }

          }
        },
        err => console.error(err),
        () => console.log('get info usuarios')
      );

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
              
            }

          }
        },
        err => console.error(err),
        () => console.log('get info contratantes')
      );

  }
  deleteUser(user){
    //eliminar usuarios
    this.loading = true;      
  }
  desactivarUsuario(usuario){
    console.log(usuario);
    this.modal.confirm()
    .size('lg')
    .showClose(true)
    .title('A simple Alert style modal window')
    .body(`
        <h4>Alert is a classic (title/body/footer) 1 button modal window that 
        does not block.</h4>
        <b>Configuration:</b>
        <ul>
            <li>Non blocking (click anywhere outside to dismiss)</li>
            <li>Size large</li>
            <li>Dismissed with default keyboard key (ESC)</li>
            <li>Close wth button click</li>
            <li>HTML content</li>
        </ul>`)
    .open();

  } 
}
