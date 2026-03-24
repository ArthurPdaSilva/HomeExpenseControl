
using Application.Mapping;
using Application.Services;
using Application.Services.Interfaces;
using Domain;
using Domain.Repositories;
using Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

namespace Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            // To configurando todo automapper para um único profile file.
            builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingContext>());

            //Adicionando a connectionString para acessar o banco
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                // o UseNpgsql é a config para usar o postgresql
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            //Realizando as injeções de dependências nessa parte:
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();


            // Estou configurando o Header do Swagger
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Home Expensive API", Version = "v1" });
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                // Habilitando o Swagger e a sua interface apenas em modo Desenvolvimento
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
