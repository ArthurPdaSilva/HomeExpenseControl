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
        public DbSet<Transaction> Transactions { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        //Evitei fazer configurações em cada classe nos arquivos delas, pois não queria poluir a camada de entidades com coisas do entity framework
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Isso é um filtro global para o usuário e transação, ou seja, no get não vai buscar usuários ou transações que foram apagados
            modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted).Property(b => b.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            modelBuilder.Entity<Transaction>().HasQueryFilter(t => !t.IsDeleted).Property(b => b.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            modelBuilder.Entity<Category>().Property(b => b.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");


            // Configuração da relação usuário x transação (1 para Muitos)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)  // Removi o delete cascade, pois o delete tanto de usuário quanto da transação são safe delete
                .OnDelete(DeleteBehavior.Restrict); //Impedir delete físico no Banco

            // Configuração da relação categoria x transação (1 para Muitos)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category)
                 .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CategoryId);
        }
    }
}
