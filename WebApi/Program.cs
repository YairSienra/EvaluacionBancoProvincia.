using Aplicacion.Usuarios;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Persistencia;
using MediatR;
using System.Text.Json.Serialization;
using System.Reflection;


using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

using Dominio;
using Aplicacion.Empleados;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.

// contenedor para registros de ususarios y logueo //





builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);
builder.Services.AddOptions();
/*builder.Services.AddCors(o => o.AddPolicy("corsApp", builder =>
{
    builder.AllowAnyHeader().AllowAnyHeader().AllowAnyOrigin();
})); */
builder.Services.AddCors(options =>
{
    var MyAllowSpecificOrigins = "_MyAllowSubdomainPolicy";
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
                      });
});

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));
builder.Services.AddMvc();
builder.Services.AddControllers(opt =>
{
    var json = opt.InputFormatters.OfType<Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonInputFormatter>().Single();
    json.SupportedMediaTypes.Add("application/csp-report");

});
builder.Services.AddMediatR(typeof(AgregarEmpleado.Ejecuta).Assembly, typeof(EliminarEmpleado.Ejecuta).Assembly);





// ----------------------------------------- Conexion Base De Datos SB
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GestionEmpleados>(opt => {
    opt.UseSqlServer(connection, b => b.MigrationsAssembly("Persistencia"));
});
// ------------------------------------------------------------------------------


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//app.UseHttpsRedirection();
app.UseAuthentication();

app.UseCors("MyPolicy");

app.UseAuthorization();


app.MapControllers();

app.Run();






