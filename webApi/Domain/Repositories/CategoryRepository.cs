using Domain.Entities;
using Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    /// <summary>
    /// Repositório único de Categoria
    /// </summary>
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Category entity)
        {
            _context.Categories.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IList<Category>> GetAllAsync()
        {
            //AsNoTracking é para ele não gastar processamento trackeando em consultas
            return await _context.Categories.AsNoTracking().ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<IList<Category>> GetAllWithTransactionsAsync()
        {
            return await _context.Categories.Include(x => x.Transactions).AsNoTracking().ToListAsync();
        }

        //Delete e Update não serão implementados na Categoria
        public Task DeleteAsync(Category entity)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Category entity)
        {
            throw new NotImplementedException();
        }

       
    }
}