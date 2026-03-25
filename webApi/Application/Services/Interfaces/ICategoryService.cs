using Application.DTOs.CategoryDTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções que Category terá acesso
    /// </summary>
    public interface ICategoryService
    {
        public void Create(CategoryDTO user);
        public IList<CategoryListDTO> GetAll();
        public CategoryDTO GetById(Guid id);
    }
}
