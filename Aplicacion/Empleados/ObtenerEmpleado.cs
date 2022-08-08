using Aplicacion.Usuarios.ModelRequest;
using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Empleados
{
    public class ObtenerEmpleado
    {
        public class Ejecuta : IRequest<List<Empleado>>{
        
        
        }
        
         
        public class Manejador : IRequestHandler<Ejecuta, List<Empleado>>
        {
            private readonly GestionEmpleados _context;

            public Manejador(GestionEmpleados context)
            {
                _context = context;
            }


            public async Task<List<Empleado>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var listaEmpleados = _context.Empleados.ToList();

                return listaEmpleados;

                throw new NotImplementedException();
            }
                
           
        }
    }
}
