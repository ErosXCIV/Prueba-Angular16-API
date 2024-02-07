import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl  } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy{

  formularioContacto: FormGroup;
  tipoDni: string = 'DNI';
  mostrarDNI: boolean = false;

  constructor(private form: FormBuilder){
    this.formularioContacto = this.form.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      tipoDni: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.formularioContacto.get('tipoDni')?.valueChanges.subscribe(value => {
      this.mostrarDNI = value != '' // Si el Value es distinto (!=) a '' (vácio) es True
      this.tipoDni = value
    })
  }

  ngOnDestroy(): void {
      
  }

  hasErrors( controlName: string, errorType: string){
    return this.formularioContacto.get(controlName)?.hasError(errorType) && this.formularioContacto.get(controlName)?.touched;
  }

  enviar(){
    console.log(this.formularioContacto);
  }

  dniValidator(control: AbstractControl): { [key: string]: any } | null {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    const value = control.value;
  
    if (value && !dniRegex.test(value)) {
      return { 'dniInvalido': true };
    }
  
    return null;
  }

}
