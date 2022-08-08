using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Empleados
{
    public class EliminarEmpleado
    {

        public class Ejecuta : IRequest
        {
            public int Id { get; set; }
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
                  
                    throw new Exception("No se pudo Eliminar");
                }

                _context.Remove(Empleado);

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se puedo Amiguin");
            }
        }
        

    }
}
