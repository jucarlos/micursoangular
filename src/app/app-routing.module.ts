import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DirectivasComponent } from './pages/directivas/directivas.component';
import { TemarioComponent } from './pages/temario/temario.component';
import { RegistroComponent } from './pages/usuarios/registro/registro.component';
import { PipesComponent } from './pages/pipes/pipes.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'directivas', component: DirectivasComponent },
  { path: 'temario', component: TemarioComponent },
  { path: 'pipes', component: PipesComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
