import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BuscadorComponent } from './components/buscador/buscador.component';


const app_routes: Routes = [
	{ path: 'login', component: LoginComponent},
	{ path: 'visor', component: BuscadorComponent},
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const app_routing = RouterModule.forRoot(app_routes);