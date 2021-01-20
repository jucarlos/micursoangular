import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposVehiculosComponent } from './tipos-vehiculos/tipos-vehiculos.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TiposVehiculosComponent,
    TipoVehiculoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class VehiculosModule { }
