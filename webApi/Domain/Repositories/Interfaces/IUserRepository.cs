using Domain.Entities;

namespace Domain.Repositories.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public Task<IList<User>> GetAllWithTransactionsAsync();
    }
}
