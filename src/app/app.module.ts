import { BrowserModule } from '@angular/platform-browser'; 
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Peticiones Http
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Pipes
import { PipesComponent } from './pages/pipes/pipes.component';
import { AlrevesPipe } from './pipes/alreves.pipe';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularMaterialComponent } from './pages/angular-material/angular-material.component';


// Componentes
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DirectivasComponent } from './pages/directivas/directivas.component';
import { TemarioComponent } from './pages/temario/temario.component';
import { RegistroComponent } from './pages/usuarios/registro/registro.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';

import { ModalComponent } from './components/modal/modal.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { FormularioHtmlComponent } from './pages/formularios/formulario-html/formulario-html.component';
import { FormularioTsComponent } from './pages/formularios/formulario-ts/formulario-ts.component';
import { VehiculosModule } from './pages/vehiculos/vehiculos.module';
import { ClientesModule } from './pages/clientes/clientes.module';

// Cambiar idioma de la app
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);

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
    TarjetaComponent,
    ModalComponent,
    DatosUsuarioComponent,
    FormularioHtmlComponent,
    FormularioTsComponent,
    AngularMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VehiculosModule,
    ClientesModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
