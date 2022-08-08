import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridEmpleadosComponent } from './grid-empleados/grid-empleados.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog'
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ActualizarEmpleadoComponent } from './actualizar-empleado/actualizar-empleado.component';


@NgModule({
  declarations: [
    AppComponent,
    GridEmpleadosComponent,
    AgregarEmpleadoComponent,
    ActualizarEmpleadoComponent,
    MatDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule


  ],
  entryComponents: [MatDialogComponent],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
