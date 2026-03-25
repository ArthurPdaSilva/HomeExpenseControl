using Application.DTOs.CategoryDTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções que Categoria terá acesso
    /// </summary>
    public interface ICategoryService : IGenericService<CategoryDTO, CategoryListDTO>
    {
    }
}
