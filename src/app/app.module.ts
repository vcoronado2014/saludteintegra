import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';


//Rutas
import { app_routing } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { EspacioVisorComponent } from './components/espacio-visor/espacio-visor.component';
import { VisualizarUsuariosComponent } from './components/visualizar-usuarios/visualizar-usuarios.component';

//Servicios
import { ServicioLoginService } from './services/servicio-login.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuscadorComponent,
    EspacioVisorComponent,
    VisualizarUsuariosComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ServicioLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
