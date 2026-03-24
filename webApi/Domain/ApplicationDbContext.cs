using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    /// <summary>
    /// Entidade de configuração das entidades para o Banco de dados.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
