namespace Domain.Repositories.Interfaces
{
    public interface IGenericRepository<T>
    {
        public void Create(T entity);
        public void Update(T entity);
        public T? GetById(Guid id);
        public IList<T> GetAll();
        public void Delete(Guid id);
    }
}
