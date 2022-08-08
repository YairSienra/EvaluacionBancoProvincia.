
using Aplicacion.Empleados;
using Aplicacion.Usuarios;
using Aplicacion.Usuarios.ModelRequest;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers
{
     public class EmpleadoController : MiControllerBase
     {

        [HttpPost("agregarEmpleado")]
        public async Task<ActionResult<EmpleadosRequest>> registrar(AgregarEmpleado.Ejecuta data)
        {
           return await Mediator.Send(data);
        }


        [HttpPut("{Id}")]
        public async Task<ActionResult<Unit>> Modificar(int id, ActualizarEmpleado.Ejecuta data)
        {   
            data.Id = id;
            return await Mediator.Send(data);
        }


        [HttpDelete("{Id}")]
        public async Task<ActionResult<Unit>> Eliminar(int id)
        {
            return await Mediator.Send(new EliminarEmpleado.Ejecuta { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List<Empleado>>> EmpleadosLista()
        {
            return await Mediator.Send(new ObtenerEmpleado.Ejecuta());
        }
     }
}
