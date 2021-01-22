import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidadoresService } from '../../../services/validadores.service';

@Component({
  selector: 'app-formulario-ts',
  templateUrl: './formulario-ts.component.html',
  styles: [
  ]
})
export class FormularioTsComponent implements OnInit {

  // referencia local al formulario
  formulario: FormGroup;


  constructor(private fb: FormBuilder, private validadoresService: ValidadoresService) {

    // hay que construirlo antes de que se termine de hacerse el html
    // lo podríamos haber hecho en un método independiente 
    // porque ya son varias lineas.
    // El formbuilder, nos ayuda a configurar los formularios reactivos.
    // por lo tanto inyectamos el formbuilder

    // el group necesita un objeto
    // Validators tiene muchas validaciones.

    this.formulario = this.fb.group({
      // posicion 1. Valor por defecto
      // 2. validadores sincronos. Se ejecutan en el mismo hilo de tiempo
      // 3. validadores asíncronos
      nombre: ['', [
        Validators.required,
        Validators.minLength(5),
        this.validadoresService.noPedro]],
      apellido: ['', Validators.required],
      correo: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]
      ],
      usuario: ['', , this.validadoresService.existeUsuario ],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      direccion: this.fb.group({
        provincia: ['', Validators.required],
        localidad: ['', Validators.required]
      }),
      // arreglo de controles
      lenguajes: this.fb.array([
        // [],
        // [],
        // []
      ])
    }, {
      validators: [
        // validaciones a nivel del formulario
        // No se deben llamar con paréntesis. Tiene que devolver una función.
        this.validadoresService.passwordsIguales('password1', 'password2')  // se podrían queitar los corchetes al ser un único validador.
      ]
    }
    );


    this.cargarDatosAlFormulario();
    // Nos podemos subscribir a los cambios del mismo formulario.
    this.cargarListeners();
  }

  cargarListeners(): void {
    // Me interesa saber cúando hay algún canmbio.
    // casa vez que el formulario tiene algún cambio
    // this.formulario.valueChanges.subscribe( valor => {
    //   console.log( valor );
    // });

    // O subscribirnos al status chandge
    // this.formulario.statusChanges.subscribe( status => {
    //   console.log( status );
    // });

    // Un campo en específico
    // this.formulario.get('nombre').valueChanges.subscribe( campo => {
    //   console.log( campo );
    // });
  }

  ngOnInit(): void {
  }

  // creamos un getter para no sobrecargar el html
  // para no poner todo esto
  /*
   [ngClass]="{
                    'is-invalid':
                      formulario.get('nombre').invalid &&
                      formulario.get('nombre').touched,
                    'is-valid': formulario.valid
                  }"
  */

  get lenguajes(): any {
    return this.formulario.get('lenguajes') as FormArray;
  }

  get provinciaNoValida(): any {
    return this.formulario.get('direccion.provincia').invalid && this.formulario.get('direccion.provincia').touched;
  }

  get localidadNoValida(): any {
    return this.formulario.get('direccion.localidad').invalid && this.formulario.get('direccion.localidad').touched;
  }

  get nombreNoValido(): any {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }

  get nombreValido(): any {
    return this.formulario.get('nombre').valid;
  }

  get apellidoNoValido(): any {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }

  get apellidoValido(): any {
    return this.formulario.get('apellido').valid;
  }


  get correoNoValido(): any {
    return this.formulario.get('correo').invalid && this.formulario.get('correo').touched;
  }

  get correoValido(): any {
    return this.formulario.get('correo').valid;
  }

  get usuarioNoValido(): any {
    return this.formulario.get('usuario').invalid && this.formulario.get('usuario').touched;
  }

  get pass1NoValido(): any {
    return this.formulario.get('password1').invalid && this.formulario.get('password1').touched;
  }

  get pass2NoValido(): boolean {

    const pass1 = this.formulario.get('password1').value;
    const pass2 = this.formulario.get('password2').value;

    return (pass1 === pass2) ? false : true;
  }


  // Objetos anidados. Agrupación de objetos.



  cargarDatosAlFormulario(): void {
    // Después de crear el formulario, podríamos llenarlo de datos
    // de esta forma.
    // this.formulario.setValue({
    //     nombre: 'Juan Carlos',
    //     apellido: 'Fernández',
    //     correo: 'carlos@gmail.com',
    //     password1: [''],
    //     password2: [''],
    //     direccion: {
    //       provincia: 'Toledo',
    //       localidad: 'Escalonilla'
    //       }
    //   });

    // Esta forma es bastante larga, hay otra forma mas corta:
    // Hacidno un truco con el reset y no hace falta mandar todas las propiedades
    this.formulario.reset({
      nombre: 'Juan Carlos',
      apellido: 'Fenández',
      correo: 'carlos@gmail.com',
    });


  }




  validar(): void {
    console.log(this.formulario);

    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    // Después de guardar todos los cambios, habría que hacer el reset de los campos:

    this.formulario.reset();
    // El reset borra el estado del formulario y lo podríamos usar en el servalue


  }

  agregarLenguaje(): void {
    this.lenguajes.push(
      // this.fb.control('Nuevo lenguaje', Validators.required )
      this.fb.control('Nuevo lenguaje')
    );
  }

  borrarLenguaje(i: number): void {
    this.lenguajes.removeAt(i);
  }

}
