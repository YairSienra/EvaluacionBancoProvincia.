using Dominio;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia
{
    public class GestionEmpleados : DbContext
    {
        public GestionEmpleados(DbContextOptions<GestionEmpleados> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


        }

        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<TipoDto> TipoDto { get; set; } 
  

    }
}
