using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Empleados
{
    public class ActualizarEmpleado
    {
        public class Ejecuta : IRequest
        {   
            public int Id { get; set; }
            public string Codigo { get; set; }
            public string Apellido { get; set; }
            public string Nombre { get; set; }
            public DateTime? FechaAlta { get; set; }
            public int? IdTipoDto { get; set; }
            public int? NumDocumento { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly GestionEmpleados _context;
            public Manejador(GestionEmpleados context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var Empleado = await _context.Empleados.FindAsync(request.Id);
              
                if (Empleado == null)
                {
                    throw new Exception(" no existe tal Empleado");
                }

                Empleado.Apellido = request.Apellido ?? Empleado.Apellido;
                Empleado.Nombre = request.Nombre ?? Empleado.Nombre;
                Empleado.NumDocumento = request.NumDocumento ?? Empleado.NumDocumento;
                Empleado.FechaAlta = request.FechaAlta ?? Empleado.FechaAlta;
                Empleado.Codigo = request.Codigo ?? Empleado.Codigo;
                Empleado.IdTipoDto = request.IdTipoDto ?? Empleado.IdTipoDto;


                var guardado = await _context.SaveChangesAsync();
                    
                if(guardado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("");
            }
              
          
        }

    }
}
