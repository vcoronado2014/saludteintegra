import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from '../../node_modules/ngx-modialog/plugins/bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Pipes
import { encriptadoPipe } from './pipes/encriptado.pipe';

//Rutas
import { app_routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { EspacioVisorComponent } from './components/espacio-visor/espacio-visor.component';
import { VisualizarUsuariosComponent } from './components/visualizar-usuarios/visualizar-usuarios.component';

//Servicios
import { ServicioLoginService } from './services/servicio-login.service';
import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';
import { ContratanteService } from './services/contratante.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuscadorComponent,
    EspacioVisorComponent,
    VisualizarUsuariosComponent,
    encriptadoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    app_routing,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ToastModule.forRoot()
  ],
  providers: [
    ServicioLoginService,
    UsuarioService,
    RolService,
    ContratanteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
