using Domain.Entities;
using Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    /// <summary>
    /// Repositório único do usuário
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(User entity)
        {
            _context.Users.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User entity)
        {
            entity.IsDeleted = true;

            //Apagando todas as transações se um usuário for apagado (se o usuário tiver transação)
            if (entity.Transactions is not null)
            {
                foreach (var t in entity.Transactions)
                    t.IsDeleted = true;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<IList<User>> GetAllAsync()
        {
            return await _context.Users.OrderByDescending(x => x.CreatedAt).AsNoTracking().ToListAsync();
        }

        public async Task<IList<User>> GetAllWithTransactionsAsync()
        {
            return await _context.Users
                            .Include(x => x.Transactions)
                            .OrderByDescending(x => x.CreatedAt)
                            .AsNoTracking()
                            .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task UpdateAsync(User entity)
        {
            _context.Users.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}