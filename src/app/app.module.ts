import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DirectivasComponent } from './pages/directivas/directivas.component';
import { TemarioComponent } from './pages/temario/temario.component';
import { RegistroComponent } from './pages/usuarios/registro/registro.component';
import { PipesComponent } from './pages/pipes/pipes.component';
import { AlrevesPipe } from './pipes/alreves.pipe';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DirectivasComponent,
    TemarioComponent,
    RegistroComponent,
    PipesComponent,
    AlrevesPipe,
    TarjetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
