using Domain.Entities;

namespace Domain.Repositories.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        //Mesmo que repita o método também em IUserRepository, não achei que fazesse sentido criar uma interface só para isso.
        public Task<IList<Category>> GetAllWithTransactionsAsync();
    }
}
