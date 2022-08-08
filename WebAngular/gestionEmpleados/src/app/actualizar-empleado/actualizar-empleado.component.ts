import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Empleados } from '../grid-empleados/grid-empleados.component';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  empleado : {
    id : number
    Codigo : string
    Apellido : string
    Nombre : string
    FechaAlta: Date
    IdTipoDto : number
    NumDocumento : number
   } = {
    id : 0,
    Codigo : '',
    Apellido: '',
    Nombre: '',
    FechaAlta: new Date,
    IdTipoDto: 0,
    NumDocumento : 0
   }


   myControl = new FormControl({type: "", id: -1});
   options: {type:string, id: number}[] = [{type: 'Dni', id: 1}, {type: 'Pasaporte', id: 2}];
   filteredOptions: Observable<{type:string, id :number}[]> = new Observable();


   private _filter(value: {type:string, id:number}): {type:string, id:number}[] {
    const filterValue = value.type.toLowerCase();
    return this.options.filter(option => option.type.toLocaleLowerCase().includes(filterValue));
  }

  constructor(public http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Empleados

    ) {
   this.empleado = {
    id : data.id,
    Apellido : data.apellido,
    Nombre: data.nombre,
    Codigo: data.codigo,
    FechaAlta: data.fechaAlta,
    NumDocumento: data.numDocumento,
    IdTipoDto : data.idTipoDto
   }
    console.log(data);

   }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || {type:"", id:-1})),
    );
  }



  onEdit() {
    this.http.put('http://localhost:8000/api/Empleado/' + this.empleado.id, {
      codigo: this.empleado.Codigo,
      apellido: this.empleado.Apellido,
      nombre: this.empleado.Nombre,
      fechaAlta: this.empleado.FechaAlta,
      idTipoDto: this.empleado.IdTipoDto,
      NumDocumento: this.empleado.NumDocumento}).subscribe((data: any) => {
        this.empleado.id = data.id


    })
}
getOptionText(option: {type:string, id:number}) {
  return option.type;
}


}
