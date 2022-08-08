using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion.Usuarios.ModelRequest
{
    public class EmpleadosRequest
    {
        public string Codigo { get; set; }
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public DateTime? FechaAlta { get; set; }
        public int? IdTipoDto { get; set; }
        public int? NumDocumento { get; set; }
      
    }
}
