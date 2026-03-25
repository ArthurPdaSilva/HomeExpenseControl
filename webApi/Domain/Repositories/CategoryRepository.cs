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

        public void Create(Category entity)
        {
            _context.Categories.Add(entity);
            _context.SaveChanges();
        }

        public IList<Category> GetAll()
        {
            //AsNoTracking é para ele não gastar processamento trackeando em consultas
            return _context.Categories.AsNoTracking().ToList();
        }

        public Category? GetById(Guid id)
        {
            return _context.Categories.Find(id);
        }

        //Delete e Update não serão implementados nesse projeto
        public void Delete(Category entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Category entity)
        {
            throw new NotImplementedException();
        }
    }
}
