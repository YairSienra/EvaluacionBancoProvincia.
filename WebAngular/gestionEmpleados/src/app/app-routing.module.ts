import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridEmpleadosComponent } from './grid-empleados/grid-empleados.component';

const routes: Routes = [
{
  path: "*", component : GridEmpleadosComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
