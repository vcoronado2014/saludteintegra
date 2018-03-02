import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { ContratanteService } from '../../services/contratante.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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
  //usuario logueado
  usuario: any;

  //formulario
  forma:FormGroup;

  //parametros para funcion de crearModificarUser()
  /*nombreUsuario,
  ecolId,
  rolId,
  nombres,
  primerApellido,
  segundoApellido,
  correoElectronico,
  ausId,
  password,
  telefonoContactoUno,
  telefonoContactoDos,
  run */

  constructor(
    private usu:UsuarioService,
    private rol:RolService,
    private con:ContratanteService,
    private router: Router
  ) {
      this.listaUsuarios = [];
      this.listaRoles = [];
      this.listaContratantes = [];

      this.forma = new FormGroup({
        'nuevoUsuarioNombre': new FormControl('', [Validators.required,
                                                   Validators.minLength(3)]),
        'nuevoUsuarioApellidoPat': new FormControl('', [Validators.required,
                                                        Validators.minLength(3)]),
        'nuevoUsuarioApellidoMat': new FormControl(),
        'nuevoUsuario': new FormControl('', [Validators.required,
                                             Validators.minLength(3)]),
        'nuevoUsuarioRun': new FormControl(),
        'nuevoUsuarioCorreo': new FormControl('', [Validators.required,
                                                   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
        'nuevoUsuarioTelefono1': new FormControl(),
        'nuevoUsuarioTelefono2': new FormControl(),
        'nuevoUsuarioEntidad': new FormControl('', Validators.required),
        'nuevoUsuarioRol': new FormControl('', Validators.required),
        'nuevoUsuarioContrasena1': new FormControl(),
        'nuevoUsuarioContrasena2': new FormControl()
      })
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

  onSubmitTemplateBased(){
    console.log("click");
  }

  guardarUsuario(){
    //console.log(this.nuevoUsuario + this.nuevoUsuarioRun + this.nuevoUsuarioNombre + this.nuevoUsuarioApellidoPat +
               // this.nuevoUsuarioCorreo + this.nuevoUsuarioTelefono1 + this.nuevoUsuarioTelefono2 + this.nuevoUsuarioEntidad +
                //this.nuevoUsuarioRol + this.nuevoUsuarioContrasena1 + this.nuevoUsuarioContrasena2);
    console.log(this.forma.value);
    console.log(this.forma.status);
    console.log(this.forma.valid);
    
    

    /*this.usu.crearModificarUser().subscribe(

    );*/
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
}
