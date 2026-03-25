using Domain.Entities;

namespace Domain.Repositories.Interfaces
{

    /// <summary>
    /// Serviço generíco para repositórios
    /// </summary>
    public interface IGenericRepository<T>
    {
        public void Create(T entity);
        public void Update(T entity);
        public T? GetById(Guid id);
        public IList<T> GetAll();
        public void Delete(T entity);
    }
}
