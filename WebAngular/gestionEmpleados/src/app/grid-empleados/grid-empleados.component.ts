import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AgregarEmpleadoComponent } from '../agregar-empleado/agregar-empleado.component';
import { ActualizarEmpleadoComponent } from '../actualizar-empleado/actualizar-empleado.component';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';




@Component({
  selector: 'app-grid-empleados',
  templateUrl: './grid-empleados.component.html',
  styleUrls: ['./grid-empleados.component.css']
})
export class GridEmpleadosComponent implements OnInit {

  desicion: boolean = false

  empleado: {
    Codigo: string
    Apellido: string
    Nombre: string
    FechaAlta: Date
    IdTipoDto: number
    NumDocumento: number
  } = {
      Codigo: "",
      Apellido: "",
      Nombre: "",
      FechaAlta: new Date,
      IdTipoDto: 0,
      NumDocumento: 0
    }


  displayedColumns: string[] = ['Codigo', 'Apellido', 'Nombre', 'Fecha de Alta', 'IdTipoDto', 'NumDocumento', 'Acciones'];
  dataSource = new MatTableDataSource<Empleados>([]);

  number: number = 0

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public ruta : Router
  ) { }

  onCancel(): void {

  }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/Empleado').subscribe((data: any) => {
      this.dataSource.data = data.$values
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(emp: Empleados) {
    this.dialog.open(MatDialogComponent).afterClosed().subscribe((data: boolean) => {
      if (data == false) {
        return
      } else {
        this.http.delete('http://localhost:8000/api/Empleado/' + emp.id).subscribe((dato: any) => {
          if (dato) {
            this.dataSource.data = this.dataSource.data.filter((emp) => {
              return emp.id != emp.id
            })
            this.ruta.navigate([])
          }
        })
      }
    })
  }


  openDialogEmpleado() {
    this.dialog.open(AgregarEmpleadoComponent, {
      width: '500px',
      height: '530px',

    })

  }

  openDialogEmpleadoActualizado(element: any) {
    this.dialog.open(ActualizarEmpleadoComponent, {
      width: '500px',
      height: '530px',
      data: element


    })

  }

}

export interface Empleados {
  codigo: string,
  id: number,
  apellido: string,
  nombre: string,
  fechaAlta: Date,
  idTipoDto: number,
  numDocumento: number
}

export interface MatDialogService {
  desicion: boolean
}
