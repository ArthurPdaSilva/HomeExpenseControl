using Domain.Entities;
using Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    /// <summary>
    /// Repositório único de Categoria
    /// </summary>
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Transaction entity)
        {
            _context.Transactions.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IList<Transaction>> GetAllAsync()
        {
            return await _context.Transactions.Include(x => x.Category).Include(x => x.User).AsNoTracking().ToListAsync();
        }

        public async Task<Transaction?> GetByIdAsync(Guid id)
        {
            return await _context.Transactions.FindAsync(id);
        }


        //Delete e Update não serão implementados na Transação
        public Task DeleteAsync(Transaction entity)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Transaction entity)
        {
            throw new NotImplementedException();
        }
    }
}