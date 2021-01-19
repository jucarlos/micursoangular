import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Localidad } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-formulario-html',
  templateUrl: './formulario-html.component.html',
  styles: [
  ]
})
export class FormularioHtmlComponent implements OnInit {

  usuario = {
    nombre: '',
    email: '',
    recuerdame: false,
    provincia: 0,
    localidad: 0,
    genero: '',
  }

  sexos = ['Hombre', 'Mujer'];

  provincias = [
    { codigo: 2 , nombre: 'Albacete'},
    { codigo: 13, nombre: 'Ciudad Real'},
    { codigo: 45, nombre: 'Toledo' },
  ];

  localidades: Localidad[] = [
    { codigo: 20, provincia: 2, nombre: 'Albacete'},
    { codigo: 21, provincia: 2, nombre: 'Los Llanos'},
    { codigo: 22, provincia: 2, nombre: 'Almansa'},
    { codigo: 23, provincia: 2, nombre: 'La Solana'},
    { codigo: 131, provincia: 13, nombre: 'Ciudad Real'},
    { codigo: 132, provincia: 13, nombre: 'Almadén'},
    { codigo: 133, provincia: 13, nombre: 'Almagro'},
    { codigo: 134, provincia: 13, nombre: 'Puerto Lápice'},
    { codigo: 135, provincia: 13, nombre: 'Puertollano'},
    { codigo: 450, provincia: 45, nombre: 'Toledo'},
    { codigo: 450, provincia: 45, nombre: 'Torrijos'},
    { codigo: 450, provincia: 45, nombre: 'Talevera de la Reina'},
    { codigo: 450, provincia: 45, nombre: 'Illescas'},
  ];

  localidadesFiltro = [] ;

  

  constructor() { }

  ngOnInit(): void {
  }

  guardar(formulario: NgForm) {
    console.log('Guardando el formulario');
    console.log( formulario.valid );
    console.log( formulario );
    console.log( formulario.value);

    if ( formulario.invalid ) {
      Object.values( formulario.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }



  cambiaProvincia( numeroProvincia: string ) {

    const codPro = +numeroProvincia;

    this.localidadesFiltro =
    this.localidades.filter( ( l ) => l.provincia === codPro);

  }


}
