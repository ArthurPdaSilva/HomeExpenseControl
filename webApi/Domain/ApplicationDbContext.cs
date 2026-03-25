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
        public DbSet<Category> Categories { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Isso é um filtro global para o usuário, ou seja, no get não vai buscar usuários que foram apagados
            modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);
        }
    }
}
