import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DirectivasComponent } from './pages/directivas/directivas.component';
import { TemarioComponent } from './pages/temario/temario.component';
import { RegistroComponent } from './pages/usuarios/registro/registro.component';
import { PipesComponent } from './pages/pipes/pipes.component';
import { FormularioHtmlComponent } from './pages/formularios/formulario-html/formulario-html.component';
import { FormularioTsComponent } from './pages/formularios/formulario-ts/formulario-ts.component';
import { TiposVehiculosComponent } from './pages/vehiculos/tipos-vehiculos/tipos-vehiculos.component';
import { AuthGuard } from './guards/auth.guard';
import { TipoVehiculoComponent } from './pages/vehiculos/tipo-vehiculo/tipo-vehiculo.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'directivas', component: DirectivasComponent },
  { path: 'temario', component: TemarioComponent },
  { path: 'pipes', component: PipesComponent },
  { path: 'fortemplate', component: FormularioHtmlComponent },
  { path: 'forts', component: FormularioTsComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tiposvehiculos', component: TiposVehiculosComponent, canActivate: [AuthGuard] },
  { path: 'tipovehiculo/:id', component: TipoVehiculoComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
