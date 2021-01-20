import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { VehiculosClienteComponent } from './vehiculos-cliente/vehiculos-cliente.component';
import { VehiculosDetalleClienteComponent } from './vehiculos-detalle-cliente/vehiculos-detalle-cliente.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientesComponent,
    ClienteDetalleComponent,
    VehiculosClienteComponent,
    VehiculosDetalleClienteComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class ClientesModule { }
