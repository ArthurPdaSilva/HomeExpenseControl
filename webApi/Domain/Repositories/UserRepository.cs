using Domain.Entities;
using Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(User entity)
        {
            _context.Users.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var user = GetById(id);

            if (user is null)
            {
                throw new Exception("Usuário não encontrado");
            }

            _context.SaveChanges();
        }

        public IList<User> GetAll()
        {
            return _context.Users.AsNoTracking().ToList();
        }

        public User? GetById(Guid id)
        {
            return _context.Users.Find(id);
        }

        public void Update(User entity)
        {
            _context.Users.Update(entity);
            _context.SaveChanges();
        }
    }
}
