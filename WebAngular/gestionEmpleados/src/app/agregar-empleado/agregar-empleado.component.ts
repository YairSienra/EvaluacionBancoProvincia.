import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Empleados } from '../grid-empleados/grid-empleados.component';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {

 empleado : {
  Codigo : string
  Apellido : string
  Nombre : string
  FechaAlta: Date
  IdTipoDto : number
  NumDocumento : number
 } = {
  Codigo : '',
  Apellido: '',
  Nombre: '',
  FechaAlta: new Date,
  IdTipoDto: 0,
  NumDocumento : 0
 }

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<AgregarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: Empleados,
    public ruta : Router) {

  }
  myControl = new FormControl({type: "", id: -1});
  options: {type:string, id: number}[] = [{type: 'Dni', id: 1}, {type: 'Pasaporte', id: 2}];
  filteredOptions: Observable<{type:string, id :number}[]> = new Observable();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || {type:"", id:-1})),
    );

  }

  private _filter(value: {type:string, id:number}): {type:string, id:number}[] {
    const filterValue = value.type.toLowerCase();
      console.log(this.myControl);

    return this.options.filter(option => option.type.toLocaleLowerCase().includes(filterValue));
  }
  onCreate() {
    this.empleado.IdTipoDto = this.myControl.value.id
    console.log(this.empleado);

    this.http.post('http://localhost:8000/api/Empleado/agregarEmpleado',{
      Codigo: this.empleado.Codigo,
      Apellido: this.empleado.Apellido,
      Nombre: this.empleado.Nombre,
      FechaAlta: this.empleado.FechaAlta,
      IdTipoDto: this.empleado.IdTipoDto,
      NumDocumento: this.empleado.NumDocumento}).subscribe((data:any) => {


      })

      this.ruta.navigate([""])
  }

  getOptionText(option: {type:string, id:number}) {
    return option.type;
  }


}
