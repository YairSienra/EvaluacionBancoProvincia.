using Aplicacion.Usuarios.ModelRequest;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System.Linq;

namespace Aplicacion.Usuarios
{
    public class AgregarEmpleado
    {
        public class Ejecuta : IRequest<EmpleadosRequest>
        {
            public string Codigo { get; set; }
            public string Apellido { get; set; }
            public string Nombre { get; set; }
            public DateTime? FechaAlta { get; set; }
            public int? IdTipoDto { get; set; }
            public int? NumDocumento { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta, EmpleadosRequest>
        {
            private readonly GestionEmpleados _gestionEmpleados;

            public Manejador (GestionEmpleados gestionEmpleados)
            {
                _gestionEmpleados = gestionEmpleados;
            }

            public async Task<EmpleadosRequest> Handle(Ejecuta request, CancellationToken cancellationToken)
            {




                var nuevoEmpleado = new Empleado
                {

                    Codigo = request.Codigo,
                    Apellido = request.Apellido,
                    Nombre = request.Nombre,
                    FechaAlta = request.FechaAlta,
                    IdTipoDto = request.IdTipoDto,
                    NumDocumento = request.NumDocumento

                    };

                    await _gestionEmpleados.AddAsync(nuevoEmpleado);
                    var guardado = await _gestionEmpleados.SaveChangesAsync();

                    if (guardado > 0)
                    {
                        return new EmpleadosRequest
                        {


                            Codigo = nuevoEmpleado.Codigo,
                            Apellido = nuevoEmpleado.Apellido,
                            Nombre = nuevoEmpleado.Nombre,
                            FechaAlta = nuevoEmpleado.FechaAlta,
                            IdTipoDto = nuevoEmpleado.IdTipoDto,
                            NumDocumento = nuevoEmpleado.NumDocumento

                        };

                    }

                

                throw new Exception("No se pudo agregar empleado, lo estaremos resolviendo");
            }

        }

    } 
}
